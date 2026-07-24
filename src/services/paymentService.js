import PaystackPop from '@paystack/inline-js';

const initializeUrl = import.meta.env.VITE_PAYSTACK_INITIALIZE_URL;
const verifyUrl = import.meta.env.VITE_PAYSTACK_VERIFY_URL;
const finalizeUrl = import.meta.env.VITE_RESERVATION_FINALIZE_URL;
const statusUrl = import.meta.env.VITE_PAYMENT_STATUS_URL;

export class PaymentFlowError extends Error {
  constructor(code, message, reference = '') {
    super(message);
    this.name = 'PaymentFlowError';
    this.code = code;
    this.reference = reference;
  }
}

const authenticatedRequest = async (url, user, body) => {
  if (!url) {
    throw new Error('Paystack server endpoints are not configured. Restart the development server after updating the environment.');
  }

  const token = await user.getIdToken();
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new PaymentFlowError(
      'network',
      import.meta.env.DEV
        ? 'The local payment service is not running. Start the Firebase Functions emulator and try again.'
        : 'The payment service could not be reached. Check your connection and try again.',
    );
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || 'Payment service request failed.');
  }
  return payload;
};

export const isPaystackConfigured = Boolean(initializeUrl && verifyUrl && finalizeUrl);

const reportPaymentStatus = async ({ user, reference, status }) => {
  if (!statusUrl) return;
  await authenticatedRequest(statusUrl, user, { reference, status }).catch(() => undefined);
};

export const completePaystackPayment = async ({ user, amount, metadata }) => {
  const initialized = await authenticatedRequest(initializeUrl, user, {
    amount,
    currency: 'NGN',
    metadata,
  });

  if (!initialized.accessCode || !initialized.reference) {
    throw new Error('Payment initialization returned an invalid response.');
  }

  const popup = new PaystackPop();
  const completed = await new Promise((resolve, reject) => {
    popup.resumeTransaction(initialized.accessCode, {
      onSuccess: resolve,
      onCancel: () => {
        void reportPaymentStatus({
          user, reference: initialized.reference, status: 'cancelled',
        });
        reject(new PaymentFlowError(
          'cancelled',
          'Payment was cancelled. Your seat hold has been released.',
          initialized.reference,
        ));
      },
      onError: () => {
        void reportPaymentStatus({
          user, reference: initialized.reference, status: 'failed',
        });
        reject(new PaymentFlowError(
          'failed',
          'Paystack checkout could not be completed. No booking was confirmed.',
          initialized.reference,
        ));
      },
    });
  });

  const reference = completed.reference || initialized.reference;
  const verified = await authenticatedRequest(verifyUrl, user, { reference });
  if (!verified.verified || verified.reference !== reference || verified.amount !== amount) {
    throw new Error('Payment could not be verified. No reservation was created.');
  }

  return verified;
};

export const finalizePaidReservation = async ({ user, payment }) => {
  const payload = await authenticatedRequest(finalizeUrl, user, {
    reference: payment.reference,
  });
  if (!payload.reservation?.id) {
    throw new Error('The payment succeeded, but the reservation could not be finalized.');
  }
  return payload.reservation;
};
