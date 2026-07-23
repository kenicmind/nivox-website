import PaystackPop from '@paystack/inline-js';

const initializeUrl = import.meta.env.VITE_PAYSTACK_INITIALIZE_URL;
const verifyUrl = import.meta.env.VITE_PAYSTACK_VERIFY_URL;

const authenticatedRequest = async (url, user, body) => {
  if (!url) {
    throw new Error('Paystack server endpoints are not configured.');
  }

  const token = await user.getIdToken();
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || 'Payment service request failed.');
  }
  return payload;
};

export const isPaystackConfigured = Boolean(initializeUrl && verifyUrl);

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
      onCancel: () => reject(new Error('Payment was cancelled.')),
      onError: () => reject(new Error('Paystack checkout could not be completed.')),
    });
  });

  const reference = completed.reference || initialized.reference;
  const verified = await authenticatedRequest(verifyUrl, user, { reference });
  if (!verified.verified || verified.reference !== reference || verified.amount !== amount) {
    throw new Error('Payment could not be verified. No reservation was created.');
  }

  return verified;
};
