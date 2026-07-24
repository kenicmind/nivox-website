const crypto = require('node:crypto');
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { FieldValue, getFirestore } = require('firebase-admin/firestore');

initializeApp();

const db = getFirestore();
const paystackSecret = defineSecret('PAYSTACK_SECRET_KEY');
const allowedOrigins = (process.env.NIVOX_ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const send = (response, status, payload) => response.status(status).json(payload);

const setCors = (request, response) => {
  const origin = request.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
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
      const status = error.message === 'UNAUTHENTICATED' ? 401 : 500;
      return send(response, status, {
        message: status === 401 ? 'Authentication required.' : 'Payment service unavailable.',
      });
    }
  },
);

exports.initializePaystackPayment = paymentHandler(async (request, response) => {
  const user = await authenticate(request);
  const amount = Number(request.body?.amount);
  if (!Number.isInteger(amount) || amount < 100) {
    return send(response, 400, { message: 'A valid amount is required.' });
  }

  const settings = await db.doc('settings/global').get();
  const configuredPrice = Number(settings.data()?.pricing || 300);
  if (amount !== configuredPrice) {
    return send(response, 400, { message: 'The session price has changed. Refresh and try again.' });
  }

  const reference = `NIVOX-${user.uid.slice(0, 8)}-${Date.now()}`;
  const data = await paystackRequest('/transaction/initialize', {
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      amount: amount * 100,
      currency: 'NGN',
      reference,
      channels: ['card', 'bank', 'ussd', 'bank_transfer'],
      metadata: {
        ...(request.body?.metadata || {}),
        firebaseUid: user.uid,
      },
    }),
  });

  await db.doc(`payment_attempts/${reference}`).set({
    uid: user.uid,
    email: user.email || '',
    amount,
    status: 'initialized',
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
  return send(response, 200, { accessCode: data.access_code, reference: data.reference });
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
    const payment = await transaction.get(paymentRef);
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
  });
  return send(response, 200, { updated: true, reference, status });
});

exports.finalizeReservation = paymentHandler(async (request, response) => {
  const user = await authenticate(request);
  const {
    reference, workspaceId, workspaceName, workspaceCategory = '',
    seatId, seatNumber, date, timeSlot,
  } = request.body || {};

  if (![reference, workspaceId, workspaceName, seatId, seatNumber, date, timeSlot]
    .every((value) => typeof value === 'string' && value.trim())) {
    return send(response, 400, { message: 'Complete reservation details are required.' });
  }

  const reservationRef = db.collection('reservations').doc();
  const verificationRef = db.doc(`payment_verifications/${reference}`);
  const paymentRef = db.doc(`payments/${reference}`);
  const seatKey = [workspaceId, date, timeSlot, seatId].join('_').replace(/[^a-zA-Z0-9_-]/g, '-');
  const seatRef = db.doc(`seat_reservations/${seatKey}`);
  const notificationRef = db.collection('notifications').doc();

  const result = await db.runTransaction(async (transaction) => {
    const [verificationSnap, seatSnap, paymentSnap] = await Promise.all([
      transaction.get(verificationRef),
      transaction.get(seatRef),
      transaction.get(paymentRef),
    ]);
    if (!verificationSnap.exists) throw new Error('PAYMENT_NOT_VERIFIED');
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
    if (seatSnap.exists && seatSnap.data().status === 'upcoming') {
      throw new Error('SEAT_UNAVAILABLE');
    }

    const amount = verification.amount;
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
