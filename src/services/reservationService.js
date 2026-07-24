import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const checkOccupiedSeats = async ({ workspaceId, date, timeSlot }) => {
  const availabilityQuery = query(
    collection(db, 'seat_reservations'),
    where('workspaceId', '==', workspaceId),
    where('date', '==', date),
    where('timeSlot', '==', timeSlot),
    where('status', 'in', ['upcoming', 'payment_pending']),
  );
  const snapshot = await getDocs(availabilityQuery);
  const now = Date.now();
  return snapshot.docs
    .map((seatDocument) => seatDocument.data())
    .filter((seat) => (
      seat.status === 'upcoming'
      || seat.holdExpiresAt?.toMillis?.() > now
    ))
    .map((seat) => seat.seatId)
    .filter(Boolean);
};

export const fetchUserReservations = async (uid) => {
  const reservationsQuery = query(
    collection(db, 'reservations'),
    where('uid', '==', uid),
  );
  const reservationSnapshot = await getDocs(reservationsQuery);
  let reservations = reservationSnapshot.docs.map((reservation) => ({
    id: reservation.id,
    sourceCollection: 'reservations',
    ...reservation.data(),
  }));

  if (reservations.length === 0) {
    const legacyQuery = query(collection(db, 'bookings'), where('uid', '==', uid));
    const legacySnapshot = await getDocs(legacyQuery);
    reservations = legacySnapshot.docs.map((booking) => ({
      id: booking.id,
      sourceCollection: 'bookings',
      ...booking.data(),
    }));
  }

  const uniqueReservations = new Map();
  reservations.forEach((reservation) => {
    const key = reservation.paymentReference
      || reservation.ticketId
      || `${reservation.workspaceId}-${reservation.date}-${reservation.timeSlot}-${reservation.seatId || reservation.seatNumber}`;
    if (!uniqueReservations.has(key)) uniqueReservations.set(key, reservation);
  });
  return [...uniqueReservations.values()];
};

export const cancelReservation = async (reservation) => {
  const sourceCollection = reservation.sourceCollection || 'reservations';
  if (sourceCollection === 'bookings') {
    await updateDoc(doc(db, sourceCollection, reservation.id), { status: 'cancelled' });
    return true;
  }

  const reservationRef = doc(db, 'reservations', reservation.id);
  const seatKey = [
    reservation.workspaceId,
    reservation.date,
    reservation.timeSlot,
    reservation.seatId,
  ].join('_').replace(/[^a-zA-Z0-9_-]/g, '-');
  const seatRef = doc(db, 'seat_reservations', seatKey);

  await runTransaction(db, async (transaction) => {
    const seat = await transaction.get(seatRef);
    transaction.update(reservationRef, { status: 'cancelled' });
    if (seat.exists()) transaction.update(seatRef, { status: 'cancelled' });
  });
  return true;
};
