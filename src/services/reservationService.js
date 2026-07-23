import { collection, addDoc, getDocs, query, where, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
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

export const cancelReservation = async (reservationId) => {
  try {
    const ref = doc(db, 'reservations', reservationId);
    await updateDoc(ref, { status: 'cancelled' });
    return true;
  } catch (error) {
    console.error('Error in cancelReservation service:', error);
    throw error;
  }
};
