const crypto = require('node:crypto');
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { FieldValue, getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const PDFDocument = require('pdfkit');

initializeApp();

const db = getFirestore();
const paystackSecret = defineSecret('PAYSTACK_SECRET_KEY');
const openaiSecret = defineSecret('OPENAI_API_KEY');
const allowedOrigins = (process.env.NIVOX_ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const isAllowedOrigin = (origin) => (
  allowedOrigins.includes(origin)
  || /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin || '')
);

const aiCoursePrompt = (course) => `You are an experienced secondary-school teacher writing a complete beginner-friendly NIVOX textbook chapter for "${course.title}".
Write simple English with short sections. Return valid JSON with keys:
overview, objectives (array), modules (array of objects with title, explanation, example, exercise, summary),
assignment, miniProject, challengeProject, faqs (array), commonMistakes (array), professionalTips (array),
careerOpportunities (array), tools (array), websites (array), books (array), communities (array), nextSteps (array).
Teach from zero. Use practical examples and include visual placeholders such as "[Diagram: ...]" where useful.
Do not say coming soon, sample, placeholder, or refer to yourself as an AI.`;

const renderLearningPdf = (course, content) => new Promise((resolve) => {
  const document = new PDFDocument({ size: 'A4', margin: 54, info: { Title: course.title, Author: 'NIVOX Learning Team' } });
  const chunks = [];
  document.on('data', (chunk) => chunks.push(chunk));
  document.on('end', () => resolve(Buffer.concat(chunks)));
  document.fillColor('#2B0A5A').fontSize(11).text('NIVOX | SHAPING TOMORROW, TODAY.');
  document.moveDown(3).fillColor('#140726').fontSize(26).text(course.title);
  document.moveDown().fontSize(12).fillColor('#555').text('AI-generated learning manual | NIVOX Learning Library');
  document.addPage();
  const write = (heading, value) => {
    document.fillColor('#2B0A5A').fontSize(16).text(heading);
    document.moveDown(0.35).fillColor('#222').fontSize(10).text(Array.isArray(value) ? value.join('\n• ') : String(value || ''));
    document.moveDown();
  };
  write('Course overview', content.overview);
  write('Learning objectives', content.objectives);
  (content.modules || []).forEach((module, index) => {
    write(`Lesson ${index + 1}: ${module.title}`, `${module.explanation}\n\nExample: ${module.example}\n\nExercise: ${module.exercise}\n\nSummary: ${module.summary}`);
  });
  write('Assignment', content.assignment);
  write('Mini project', content.miniProject);
  write('Challenge project', content.challengeProject);
  write('Frequently asked questions', content.faqs);
  write('Common mistakes', content.commonMistakes);
  write('Professional tips', content.professionalTips);
  write('Career opportunities', content.careerOpportunities);
  write('Tools and resources', [...(content.tools || []), ...(content.websites || []), ...(content.books || []), ...(content.communities || [])]);
  write('Next learning steps', content.nextSteps);
  document.end();
});
const BOOKING_HOLD_MINUTES = 15;
const TIME_SLOTS = new Set([
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM',
]);
const BOOKING_CATALOG = {
  'learning-zone': {
    name: 'Learning Zone Desk',
    category: 'Study & Research',
    seats: Object.fromEntries(Array.from({ length: 12 }, (_, index) => [
      `lz-desk-${index + 1}`,
      `Desk A-${String(index + 1).padStart(2, '0')}`,
    ])),
  },
  'computer-lab': {
    name: 'Computer Lab Workstation',
    category: 'High-Performance PC',
    seats: Object.fromEntries(Array.from({ length: 8 }, (_, index) => [
      `pc-lab-${index + 1}`,
      `PC Station PC-0${index + 1}`,
    ])),
  },
  'creator-studio': {
    name: 'Creator Studio Pod',
    category: 'Media & Podcasting',
    seats: {
      'pod-01': 'Pod POD-01 (Podcast)',
      'pod-02': 'Pod POD-02 (Video)',
      'pod-03': 'Pod POD-03 (Editing)',
      'pod-04': 'Pod POD-04 (Live stream)',
    },
  },
  'innovation-lounge': {
    name: 'Innovation Lounge Desk',
    category: 'Team Collaboration',
    seats: Object.fromEntries([1, 2].flatMap((table) => (
      [1, 2, 3, 4].map((seat) => [`t${table}-s${seat}`, `Table ${table} - Seat ${seat}`])
    ))),
  },
};

const send = (response, status, payload) => response.status(status).json(payload);

const getSeatKey = ({ workspaceId, date, timeSlot, seatId }) => (
  [workspaceId, date, timeSlot, seatId].join('_').replace(/[^a-zA-Z0-9_-]/g, '-')
);

const validateBooking = (metadata = {}) => {
  const { workspaceId, seatId, date, timeSlot } = metadata;
  const workspace = BOOKING_CATALOG[workspaceId];
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const today = new Date().toISOString().slice(0, 10);
  const requestedDate = new Date(`${date}T00:00:00.000Z`);
  if (
    !workspace
    || !workspace.seats[seatId]
    || !datePattern.test(date || '')
    || Number.isNaN(requestedDate.getTime())
    || requestedDate.toISOString().slice(0, 10) !== date
    || date < today
    || !TIME_SLOTS.has(timeSlot)
  ) {
    throw new Error('INVALID_BOOKING');
  }
  return {
    workspaceId,
    workspaceName: workspace.name,
    workspaceCategory: workspace.category,
    seatId,
    seatNumber: workspace.seats[seatId],
    date,
    timeSlot,
  };
};

const setCors = (request, response) => {
  const origin = request.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    response.set('Access-Control-Allow-Origin', origin);
    response.set('Vary', 'Origin');
  }
  response.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Paystack-Signature');
  response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
};

const authenticate = async (request) => {
  const header = request.headers.authorization || '';
  if (!header.startsWith('Bearer ')) throw new Error('UNAUTHENTICATED');
  return getAuth().verifyIdToken(header.slice(7));
};

const paystackRequest = async (path, options = {}) => {
  const response = await fetch(`https://api.paystack.co${path}`, {
    signal: AbortSignal.timeout(15000),
    ...options,
    headers: {
      Authorization: `Bearer ${paystackSecret.value()}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const payload = await response.json();
  if (!response.ok || payload.status !== true) {
    throw new Error(payload.message || 'Paystack request failed.');
  }
  return payload.data;
};

const paymentHandler = (handler) => onRequest(
  { region: 'europe-west1', secrets: [paystackSecret] },
  async (request, response) => {
    setCors(request, response);
    if (request.method === 'OPTIONS') return response.status(204).send('');
    if (request.method !== 'POST') return send(response, 405, { message: 'Method not allowed.' });
    try {
      return await handler(request, response);
    } catch (error) {
      console.error(error);
      const errors = {
        UNAUTHENTICATED: [401, 'Authentication required.'],
        INVALID_BOOKING: [400, 'Choose a valid booking option and schedule.'],
        SEAT_UNAVAILABLE: [409, 'That seat is no longer available. Choose another seat.'],
        PAYMENT_NOT_FOUND: [404, 'Payment record was not found.'],
        PAYMENT_ALREADY_PAID: [409, 'This payment is already complete.'],
        PAYMENT_NOT_VERIFIED: [409, 'Paystack has not verified this payment.'],
        PAYMENT_ALREADY_USED: [409, 'This payment has already been used.'],
      };
      const [status, message] = errors[error.message] || [500, 'Payment service unavailable.'];
      return send(response, status, {
        message,
      });
    }
  },
);

exports.createMockReservation = onRequest(
  { region: 'europe-west1' },
  async (request, response) => {
    setCors(request, response);
    if (request.method === 'OPTIONS') return response.status(204).send('');
    if (request.method !== 'POST') return send(response, 405, { message: 'Method not allowed.' });
    try {
      const user = await authenticate(request);
      const booking = validateBooking(request.body?.metadata);
      const reservationRef = db.collection('reservations').doc();
      const bookingId = `NIVOX-${reservationRef.id.slice(0, 8).toUpperCase()}`;
      const seatRef = db.doc(`seat_reservations/${getSeatKey(booking)}`);
      const amount = Number(request.body?.amount || 0);
      const reservation = {
        uid: user.uid,
        userEmail: user.email || '',
        userName: user.name || user.email?.split('@')[0] || 'Student',
        bookingId,
        ticketId: bookingId,
        ...booking,
        duration: '2 Hours',
        price: amount,
        priceFormatted: `₦${amount.toLocaleString()}`,
        paymentStatus: 'mock_paid',
        paymentMethod: 'Development Mock',
        paymentReference: `MOCK-${reservationRef.id.toUpperCase()}`,
        status: 'approved',
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };

      await db.runTransaction(async (transaction) => {
        const seat = await transaction.get(seatRef);
        const seatData = seat.data();
        const activeHold = seatData?.status === 'payment_pending'
          && seatData.holdExpiresAt?.toMillis?.() > Date.now();
        if (['approved', 'upcoming'].includes(seatData?.status) || activeHold) {
          throw new Error('SEAT_UNAVAILABLE');
        }
        transaction.create(reservationRef, reservation);
        transaction.set(seatRef, {
          uid: user.uid,
          reservationId: reservationRef.id,
          bookingId,
          workspaceId: booking.workspaceId,
          date: booking.date,
          timeSlot: booking.timeSlot,
          seatId: booking.seatId,
          status: 'approved',
          updatedAt: FieldValue.serverTimestamp(),
        });
      });
      return send(response, 200, {
        reservation: { id: reservationRef.id, ...reservation },
      });
    } catch (error) {
      console.error('Mock reservation failed:', error);
      const errors = {
        UNAUTHENTICATED: [401, 'Please sign in again before completing the booking.'],
        INVALID_BOOKING: [400, 'Choose a valid space, date, time, and seat.'],
        SEAT_UNAVAILABLE: [409, 'That seat has just been booked. Please choose another seat.'],
      };
      const [status, message] = errors[error.message] || [
        500,
        process.env.FUNCTIONS_EMULATOR === 'true'
          ? `Development booking error: ${error.message}`
          : 'The development booking could not be created.',
      ];
      return send(response, status, { message });
    }
  },
);

exports.generateLearningMaterial = onRequest(
  { region: 'europe-west1', secrets: [openaiSecret] },
  async (request, response) => {
    setCors(request, response);
    if (request.method === 'OPTIONS') return response.status(204).send('');
    if (request.method !== 'POST') return send(response, 405, { message: 'Method not allowed.' });
    try {
      const caller = await authenticate(request);
      const claims = await getAuth().getUser(caller.uid);
      if (claims.customClaims?.admin !== true) return send(response, 403, { message: 'Administrator access required.' });
      const course = request.body?.course;
      if (!course?.id || !course?.title) return send(response, 400, { message: 'A course is required.' });
      const aiResponse = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openaiSecret.value()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5.6-sol',
          input: aiCoursePrompt(course),
          text: { format: { type: 'json_object' } },
        }),
      });
      const payload = await aiResponse.json();
      if (!aiResponse.ok) throw new Error(payload.error?.message || 'OpenAI generation failed.');
      const text = payload.output_text || payload.output?.flatMap((item) => item.content || []).find((item) => item.text)?.text;
      const content = JSON.parse(text);
      const pdfBuffer = await renderLearningPdf(course, content);
      const bucket = getStorage().bucket();
      const storagePath = `learning-materials/generated/${course.id}-${Date.now()}.pdf`;
      const file = bucket.file(storagePath);
      await file.save(pdfBuffer, { metadata: { contentType: 'application/pdf', metadata: { courseId: course.id, provider: 'openai' } } });
      const [signedUrl] = await file.getSignedUrl({ action: 'read', expires: '2035-01-01' });
      const materialRef = db.doc(`learning_materials/${course.id}`);
      await materialRef.set({
        courseId: course.id,
        title: course.title,
        category: course.category || 'General',
        difficulty: course.difficulty || 'Beginner',
        content,
        provider: 'openai',
        model: 'gpt-5.6-sol',
        pdfUrl: signedUrl,
        storagePath,
        published: true,
        generatedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
      return send(response, 200, { material: { id: course.id, title: course.title, content, published: true } });
    } catch (error) {
      console.error('Learning material generation failed:', error);
      return send(response, 500, { message: error.message || 'Learning material generation failed.' });
    }
  },
);

exports.initializePaystackPayment = paymentHandler(async (request, response) => {
  const user = await authenticate(request);
  if (!user.email || user.email_verified !== true) {
    return send(response, 403, { message: 'A verified student email is required.' });
  }
  const amount = Number(request.body?.amount);
  if (!Number.isInteger(amount) || amount < 100) {
    return send(response, 400, { message: 'A valid amount is required.' });
  }

  const settings = await db.doc('settings/global').get();
  const configuredPrice = Number(settings.data()?.pricing || 300);
  if (amount !== configuredPrice) {
    return send(response, 400, { message: 'The session price has changed. Refresh and try again.' });
  }

  const booking = validateBooking(request.body?.metadata);
  const reference = `NIVOX-${user.uid.slice(0, 8)}-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
  const seatRef = db.doc(`seat_reservations/${getSeatKey(booking)}`);
  const holdExpiresAt = new Date(Date.now() + BOOKING_HOLD_MINUTES * 60 * 1000);

  await db.runTransaction(async (transaction) => {
    const seat = await transaction.get(seatRef);
    const seatData = seat.data();
    const activeHold = seatData?.status === 'payment_pending'
      && seatData.holdExpiresAt?.toMillis?.() > Date.now();
    if (seatData?.status === 'upcoming' || activeHold) throw new Error('SEAT_UNAVAILABLE');
    transaction.set(seatRef, {
      uid: user.uid,
      reference,
      ...booking,
      status: 'payment_pending',
      holdExpiresAt,
      updatedAt: FieldValue.serverTimestamp(),
    });
  });

  let data;
  try {
    data = await paystackRequest('/transaction/initialize', {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        amount: amount * 100,
        currency: 'NGN',
        reference,
        channels: ['card', 'bank', 'ussd', 'bank_transfer'],
        metadata: {
          ...booking,
          firebaseUid: user.uid,
          cancel_action: allowedOrigins[0] || undefined,
        },
      }),
    });
  } catch (error) {
    await seatRef.set({ status: 'failed', updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    throw error;
  }

  await db.doc(`payment_attempts/${reference}`).set({
    uid: user.uid,
    email: user.email || '',
    amount,
    booking,
    seatKey: seatRef.id,
    status: 'initialized',
    holdExpiresAt,
    createdAt: FieldValue.serverTimestamp(),
  });
  await db.doc(`payments/${reference}`).set({
    reservationId: null,
    uid: user.uid,
    userEmail: user.email || '',
    amount,
    currency: 'NGN',
    paymentStatus: 'pending',
    paymentReference: reference,
    paymentMethod: 'Paystack',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return send(response, 200, {
    accessCode: data.access_code,
    authorizationUrl: data.authorization_url,
    reference: data.reference,
  });
});

exports.verifyPaystackPayment = paymentHandler(async (request, response) => {
  const user = await authenticate(request);
  const reference = String(request.body?.reference || '');
  const attempt = await db.doc(`payment_attempts/${reference}`).get();
  if (!attempt.exists || attempt.data().uid !== user.uid) {
    return send(response, 403, { message: 'Payment reference does not belong to this account.' });
  }

  const data = await paystackRequest(`/transaction/verify/${encodeURIComponent(reference)}`);
  const amount = data.amount / 100;
  if (
    data.status !== 'success'
    || data.currency !== 'NGN'
    || amount !== attempt.data().amount
    || data.customer?.email?.toLowerCase() !== (user.email || '').toLowerCase()
  ) {
    await attempt.ref.set({ status: 'failed', updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    await db.doc(`payments/${reference}`).set({
      paymentStatus: 'failed',
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    if (attempt.data().seatKey) {
      await db.doc(`seat_reservations/${attempt.data().seatKey}`).set({
        status: 'failed',
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
    }
    return send(response, 409, { message: 'Paystack has not confirmed this payment.' });
  }

  await db.doc(`payment_verifications/${reference}`).set({
    uid: user.uid,
    amount,
    currency: data.currency,
    verified: true,
    used: false,
    paystackTransactionId: data.id,
    verifiedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  await attempt.ref.set({ status: 'verified', verifiedAt: FieldValue.serverTimestamp() }, { merge: true });
  await db.doc(`payments/${reference}`).set({
    paymentStatus: 'paid',
    paystackTransactionId: data.id,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  return send(response, 200, { verified: true, reference, amount });
});

exports.updatePaymentStatus = paymentHandler(async (request, response) => {
  const user = await authenticate(request);
  const reference = String(request.body?.reference || '');
  const status = String(request.body?.status || '');
  if (!['failed', 'cancelled'].includes(status)) {
    return send(response, 400, { message: 'Invalid payment status.' });
  }
  const paymentRef = db.doc(`payments/${reference}`);
  const attemptRef = db.doc(`payment_attempts/${reference}`);
  await db.runTransaction(async (transaction) => {
    const [payment, attempt] = await Promise.all([
      transaction.get(paymentRef),
      transaction.get(attemptRef),
    ]);
    if (!payment.exists || payment.data().uid !== user.uid) throw new Error('PAYMENT_NOT_FOUND');
    if (payment.data().paymentStatus === 'paid') throw new Error('PAYMENT_ALREADY_PAID');
    transaction.set(paymentRef, {
      paymentStatus: status,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    transaction.set(attemptRef, {
      status,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    if (attempt.data()?.seatKey) {
      const seatRef = db.doc(`seat_reservations/${attempt.data().seatKey}`);
      transaction.set(seatRef, {
        status,
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
    }
  });
  return send(response, 200, { updated: true, reference, status });
});

exports.finalizeReservation = paymentHandler(async (request, response) => {
  const user = await authenticate(request);
  const reference = String(request.body?.reference || '');
  if (!reference) return send(response, 400, { message: 'Payment reference is required.' });

  const reservationRef = db.collection('reservations').doc();
  const verificationRef = db.doc(`payment_verifications/${reference}`);
  const paymentRef = db.doc(`payments/${reference}`);
  const attemptRef = db.doc(`payment_attempts/${reference}`);
  const notificationRef = db.collection('notifications').doc();

  const result = await db.runTransaction(async (transaction) => {
    const [verificationSnap, paymentSnap, attemptSnap] = await Promise.all([
      transaction.get(verificationRef),
      transaction.get(paymentRef),
      transaction.get(attemptRef),
    ]);
    if (!verificationSnap.exists) throw new Error('PAYMENT_NOT_VERIFIED');
    if (!attemptSnap.exists || attemptSnap.data().uid !== user.uid) throw new Error('PAYMENT_NOT_FOUND');
    const booking = validateBooking(attemptSnap.data().booking);
    const seatRef = db.doc(`seat_reservations/${attemptSnap.data().seatKey || getSeatKey(booking)}`);
    const seatSnap = await transaction.get(seatRef);
    const verification = verificationSnap.data();
    if (verification.uid !== user.uid || verification.verified !== true) {
      throw new Error('PAYMENT_NOT_VERIFIED');
    }
    if (verification.used === true) {
      if (paymentSnap.exists && paymentSnap.data().uid === user.uid) {
        const existing = await transaction.get(db.doc(`reservations/${paymentSnap.data().reservationId}`));
        if (existing.exists) return { id: existing.id, ...existing.data() };
      }
      throw new Error('PAYMENT_ALREADY_USED');
    }
    if (
      !seatSnap.exists
      || seatSnap.data().reference !== reference
      || seatSnap.data().uid !== user.uid
      || !['payment_pending', 'paid'].includes(seatSnap.data().status)
    ) {
      throw new Error('SEAT_UNAVAILABLE');
    }

    const amount = verification.amount;
    const {
      workspaceId, workspaceName, workspaceCategory, date, timeSlot, seatId, seatNumber,
    } = booking;
    const reservation = {
      uid: user.uid,
      userEmail: user.email || '',
      userName: user.name || user.email?.split('@')[0] || 'Student',
      ticketId: `TKT-${reservationRef.id.toUpperCase()}`,
      workspaceId, workspaceName, workspaceCategory, date, timeSlot, seatId, seatNumber,
      duration: '2 Hours',
      price: amount,
      priceFormatted: `₦${amount.toLocaleString()}`,
      paymentStatus: 'paid',
      paymentMethod: 'Paystack',
      paymentReference: reference,
      status: 'upcoming',
      createdAt: FieldValue.serverTimestamp(),
    };

    transaction.create(reservationRef, reservation);
    transaction.set(paymentRef, {
      reservationId: reservationRef.id,
      uid: user.uid,
      userEmail: user.email || '',
      amount,
      currency: verification.currency || 'NGN',
      paymentStatus: 'paid',
      paymentReference: reference,
      paymentMethod: 'Paystack',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    transaction.set(seatRef, {
      reservationId: reservationRef.id, uid: user.uid, workspaceId, date, timeSlot, seatId,
      status: 'upcoming',
      reference,
      holdExpiresAt: null,
      createdAt: FieldValue.serverTimestamp(),
    });
    transaction.create(notificationRef, {
      uid: user.uid,
      title: 'Reservation Confirmed',
      detail: `${workspaceName} (${seatNumber}) • ${timeSlot}`,
      type: 'reservation',
      read: false,
      createdAt: FieldValue.serverTimestamp(),
    });
    transaction.update(verificationRef, {
      used: true,
      reservationId: reservationRef.id,
      usedAt: FieldValue.serverTimestamp(),
    });
    transaction.set(attemptRef, {
      status: 'completed',
      reservationId: reservationRef.id,
      completedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    return { id: reservationRef.id, ...reservation };
  });

  return send(response, 200, { reservation: result });
});

exports.paystackWebhook = onRequest(
  { region: 'europe-west1', secrets: [paystackSecret] },
  async (request, response) => {
    if (request.method !== 'POST') return response.status(405).send('Method not allowed');
    const signature = request.headers['x-paystack-signature'] || '';
    const digest = crypto
      .createHmac('sha512', paystackSecret.value())
      .update(request.rawBody)
      .digest('hex');
    const signatureBuffer = Buffer.from(signature);
    const digestBuffer = Buffer.from(digest);
    if (
      signatureBuffer.length !== digestBuffer.length
      || !crypto.timingSafeEqual(signatureBuffer, digestBuffer)
    ) {
      return response.status(401).send('Invalid signature');
    }

    const event = request.body;
    if (event.event === 'charge.success') {
      const data = event.data;
      const attemptRef = db.doc(`payment_attempts/${data.reference}`);
      const attempt = await attemptRef.get();
      if (attempt.exists && data.currency === 'NGN' && data.amount / 100 === attempt.data().amount) {
        await db.doc(`payment_verifications/${data.reference}`).set({
          uid: attempt.data().uid,
          amount: data.amount / 100,
          currency: data.currency,
          verified: true,
          used: false,
          paystackTransactionId: data.id,
          verifiedAt: FieldValue.serverTimestamp(),
        }, { merge: true });
        await db.doc(`payments/${data.reference}`).set({
          paymentStatus: 'paid',
          paystackTransactionId: data.id,
          updatedAt: FieldValue.serverTimestamp(),
        }, { merge: true });
      }
    }
    return response.status(200).send('ok');
  },
);

// One-time, server-authorized administrator bootstrap and promotion endpoint.
exports.bootstrapAdmin = onRequest(async (request, response) => {
  const origin = request.get('origin');
  if (origin && (allowedOrigins.length === 0 || allowedOrigins.includes(origin))) {
    response.set('Access-Control-Allow-Origin', origin);
    response.set('Vary', 'Origin');
  }
  response.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (request.method === 'OPTIONS') return response.status(204).send('');
  if (request.method !== 'POST') return send(response, 405, { error: 'Method not allowed' });
  try {
    const authorization = request.get('authorization') || '';
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
    if (!token) return send(response, 401, { error: 'Authentication required' });
    const caller = await getAuth().verifyIdToken(token, true);
    const targetEmail = String(request.body?.email || '').trim().toLowerCase();
    if (caller.admin === true && targetEmail && targetEmail !== caller.email) {
      const target = await getAuth().getUserByEmail(targetEmail);
      await getAuth().setCustomUserClaims(target.uid, { ...(target.customClaims || {}), admin: true });
      await db.doc(`users/${target.uid}`).set({ uid: target.uid, email: target.email || targetEmail, role: 'admin', adminGrantedAt: FieldValue.serverTimestamp() }, { merge: true });
      return send(response, 200, { ok: true, promotedUid: target.uid });
    }
    const existingAdmins = (await getAuth().listUsers(1000)).users
      .filter((user) => user.customClaims?.admin === true);
    if (caller.admin !== true && existingAdmins.length > 0) {
      return send(response, 409, { error: 'Administrator already configured.' });
    }
    const configRef = db.doc('system/adminConfig');
    const result = await db.runTransaction(async (transaction) => {
      const configSnap = await transaction.get(configRef);
      if (configSnap.exists && configSnap.data()?.configured === true && caller.admin !== true) {
        throw new Error('ADMIN_ALREADY_CONFIGURED');
      }
      if (caller.admin !== true) {
        transaction.set(configRef, {
          configured: true,
          configuredBy: caller.uid,
          configuredAt: FieldValue.serverTimestamp(),
        }, { merge: true });
      }
      return { isPromotion: caller.admin === true };
    });
    const currentUser = await getAuth().getUser(caller.uid);
    await getAuth().setCustomUserClaims(caller.uid, {
      ...(currentUser.customClaims || {}),
      admin: true,
    });
    await db.doc(`users/${caller.uid}`).set({
      uid: caller.uid,
      email: caller.email || '',
      role: 'admin',
      adminGrantedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    return send(response, 200, { ok: true, isPromotion: result.isPromotion });
  } catch (error) {
    if (error.message === 'ADMIN_ALREADY_CONFIGURED') return send(response, 409, { error: 'Administrator already configured.' });
    console.error('Admin bootstrap failed:', error);
    return send(response, 403, { error: 'Unable to configure administrator.' });
  }
});
