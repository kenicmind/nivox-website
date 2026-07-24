const MOCK_DELAY_MS = 2400;
const STORAGE_KEY = 'nivox_mock_bookings';

const wait = (milliseconds) => new Promise((resolve) => {
  window.setTimeout(resolve, milliseconds);
});

const readBookings = () => {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const getMockBookings = (uid) => (
  readBookings().filter((booking) => booking.uid === uid)
);

export const cancelMockBooking = (bookingId) => {
  const bookings = readBookings().map((booking) => (
    booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
  ));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

export const completeMockBooking = async ({
  user,
  amount,
  workspace,
  seat,
  date,
  timeSlot,
}) => {
  await wait(MOCK_DELAY_MS);
  const uniquePart = `${Date.now().toString(36)}${crypto.randomUUID().slice(0, 6)}`.toUpperCase();
  const bookingId = `NIVOX-${uniquePart}`;
  const reservation = {
    id: `mock-${uniquePart}`,
    sourceCollection: 'mock',
    uid: user.uid,
    userEmail: user.email || '',
    userName: user.displayName || user.email?.split('@')[0] || 'Student',
    bookingId,
    ticketId: bookingId,
    workspaceId: workspace.id,
    workspaceName: workspace.name,
    workspaceCategory: workspace.category,
    seatId: seat.id,
    seatNumber: seat.number,
    date,
    timeSlot,
    duration: '2 Hours',
    price: amount,
    priceFormatted: `₦${Number(amount).toLocaleString()}`,
    paymentStatus: 'mock_paid',
    paymentMethod: 'Development Mock',
    paymentReference: `MOCK-${uniquePart}`,
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([reservation, ...readBookings()]));
  return reservation;
};
