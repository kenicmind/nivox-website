import { collection, addDoc, getDocs, query, where, doc, updateDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * Platform-Agnostic Reservation & Seat Service
 * Compatible with React Web and React Native
 */

export const checkOccupiedSeats = async ({ workspaceId, date, timeSlot }) => {
  try {
    const q = query(
      collection(db, 'reservations'),
      where('workspaceId', '==', workspaceId),
      where('date', '==', date),
      where('timeSlot', '==', timeSlot),
      where('status', '==', 'upcoming')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data().seatId).filter(Boolean);
  } catch (error) {
    console.error('Error checking occupied seats:', error);
    return [];
  }
};

export const createReservation = async ({ user, workspace, seat, date, timeSlot }) => {
  if (!user) throw new Error('User authentication required');

  const paymentRef = `PAY-NIV-${Math.floor(100000 + Math.random() * 900000)}`;
  const ticketId = `TKT-NIV-${Math.floor(100000 + Math.random() * 900000)}`;

  const reservationPayload = {
    uid: user.uid,
    userEmail: user.email || '',
    userName: user.displayName || user.email?.split('@')[0] || 'Student',
    ticketId,
    workspaceId: workspace.id,
    workspaceName: workspace.name,
    workspaceCategory: workspace.category,
    date,
    timeSlot,
    seatId: seat.id,
    seatNumber: seat.number,
    duration: '2 Hours',
    price: 300,
    priceFormatted: '₦300',
    paymentStatus: 'paid',
    paymentMethod: 'Paystack Card',
    paymentReference: paymentRef,
    status: 'upcoming',
    createdAt: serverTimestamp(),
  };

  // 1. Save to `reservations`
  const reservationRef = await addDoc(collection(db, 'reservations'), reservationPayload);

  // 2. Save payment record
  await addDoc(collection(db, 'payments'), {
    reservationId: reservationRef.id,
    uid: user.uid,
    userEmail: user.email || '',
    amount: 300,
    currency: 'NGN',
    paymentStatus: 'paid',
    paymentReference: paymentRef,
    paymentMethod: 'Paystack Card',
    createdAt: serverTimestamp(),
  });

  // 3. Save notification record
  await addDoc(collection(db, 'notifications'), {
    uid: user.uid,
    title: 'Reservation Confirmed',
    detail: `${workspace.name} (${seat.number}) • ${timeSlot}`,
    time: 'Just now',
    type: 'reservation',
    read: false,
    createdAt: serverTimestamp(),
  });

  return { id: reservationRef.id, ...reservationPayload };
};

export const fetchUserReservations = async (uid) => {
  try {
    const qRes = query(collection(db, 'reservations'), where('uid', '==', uid));
    const snapRes = await getDocs(qRes);
    let resDocs = snapRes.docs.map((d) => ({ id: d.id, ...d.data() }));

    if (resDocs.length === 0) {
      const qBook = query(collection(db, 'bookings'), where('uid', '==', uid));
      const snapBook = await getDocs(qBook);
      resDocs = snapBook.docs.map((d) => ({ id: d.id, ...d.data() }));
    }

    const uniqueMap = new Map();
    resDocs.forEach((b) => {
      const key = b.paymentReference || b.ticketId || `${b.workspaceId}-${b.date}-${b.timeSlot}-${b.seatId || b.seatNumber}`;
      if (!uniqueMap.has(key)) uniqueMap.set(key, b);
    });

    return Array.from(uniqueMap.values());
  } catch (error) {
    console.error('Error in fetchUserReservations service:', error);
    throw error;
  }
};

export const cancelReservation = async (reservation) => {
  try {
    const sourceCollection = reservation.sourceCollection || 'reservations';
    if (sourceCollection === 'bookings') {
      await updateDoc(doc(db, sourceCollection, reservation.id), { status: 'cancelled' });
      return true;
    }

    const reservationRef = doc(db, 'reservations', reservation.id);
    const seatKey = [reservation.workspaceId, reservation.date, reservation.timeSlot, reservation.seatId]
      .join('_')
      .replace(/[^a-zA-Z0-9_-]/g, '-');
    const seatRef = doc(db, 'seat_reservations', seatKey);

    await runTransaction(db, async (transaction) => {
      transaction.update(reservationRef, { status: 'cancelled' });
      transaction.update(seatRef, { status: 'cancelled' });
    });
    return true;
  } catch (error) {
    console.error('Error in cancelReservation service:', error);
    throw error;
  }
};

export const createVerifiedReservation = async ({
  user,
  workspace,
  seat,
  date,
  timeSlot,
  payment,
}) => {
  const reservationRef = doc(collection(db, 'reservations'));
  const paymentRef = doc(db, 'payments', payment.reference);
  const verificationRef = doc(db, 'payment_verifications', payment.reference);
  const notificationRef = doc(collection(db, 'notifications'));
  const seatKey = [workspace.id, date, timeSlot, seat.id]
    .join('_')
    .replace(/[^a-zA-Z0-9_-]/g, '-');
  const seatRef = doc(db, 'seat_reservations', seatKey);

  const reservationPayload = {
    uid: user.uid,
    userEmail: user.email || '',
    userName: user.displayName || user.email?.split('@')[0] || 'Student',
    ticketId: `TKT-${reservationRef.id.toUpperCase()}`,
    workspaceId: workspace.id,
    workspaceName: workspace.name,
    workspaceCategory: workspace.category,
    date,
    timeSlot,
    seatId: seat.id,
    seatNumber: seat.number,
    duration: '2 Hours',
    price: payment.amount,
    priceFormatted: `₦${payment.amount.toLocaleString()}`,
    paymentStatus: 'paid',
    paymentMethod: 'Paystack',
    paymentReference: payment.reference,
    status: 'upcoming',
    createdAt: serverTimestamp(),
  };

  await runTransaction(db, async (transaction) => {
    const [verificationSnap, seatSnap] = await Promise.all([
      transaction.get(verificationRef),
      transaction.get(seatRef),
    ]);

    if (!verificationSnap.exists()) {
      throw new Error('Verified payment record was not found.');
    }

    const verification = verificationSnap.data();
    if (
      verification.uid !== user.uid
      || verification.verified !== true
      || verification.used === true
      || verification.amount !== payment.amount
    ) {
      throw new Error('Payment verification is invalid or has already been used.');
    }

    if (seatSnap.exists() && seatSnap.data().status === 'upcoming') {
      throw new Error('That seat was just reserved by another student.');
    }

    transaction.set(reservationRef, reservationPayload);
    transaction.set(paymentRef, {
      reservationId: reservationRef.id,
      uid: user.uid,
      userEmail: user.email || '',
      amount: payment.amount,
      currency: 'NGN',
      paymentStatus: 'paid',
      paymentReference: payment.reference,
      paymentMethod: 'Paystack',
      createdAt: serverTimestamp(),
    });
    transaction.set(seatRef, {
      reservationId: reservationRef.id,
      uid: user.uid,
      workspaceId: workspace.id,
      date,
      timeSlot,
      seatId: seat.id,
      status: 'upcoming',
      createdAt: serverTimestamp(),
    });
    transaction.set(notificationRef, {
      uid: user.uid,
      title: 'Reservation Confirmed',
      detail: `${workspace.name} (${seat.number}) • ${timeSlot}`,
      type: 'reservation',
      read: false,
      createdAt: serverTimestamp(),
    });
    transaction.update(verificationRef, {
      used: true,
      reservationId: reservationRef.id,
      usedAt: serverTimestamp(),
    });
  });

  return { id: reservationRef.id, ...reservationPayload };
};
