# NIVOX

NIVOX is a React 19, Firebase, and Paystack platform for a student innovation
hub. Its active application path is `src/main.jsx` → `src/App.jsx` →
`src/routes/router.jsx`.

## Local setup

1. Install dependencies with `npm ci`.
2. Copy `.env.example` to `.env.local` and replace every example URL.
3. Run `npm run dev`.
4. Validate changes with `npm run lint` and `npm run build`.

Firebase client identifiers are intentionally stored in the client bundle.
Never add the Paystack secret key or a service-account key to Vite environment
variables.

## Payment deployment

The payment flow uses four authenticated HTTPS Firebase Functions:

- `initializePaystackPayment`
- `verifyPaystackPayment`
- `updatePaymentStatus`
- `finalizeReservation`

It also uses `paystackWebhook` for signed Paystack events. Configure the secret
and deploy:

```text
firebase functions:secrets:set PAYSTACK_SECRET_KEY
firebase deploy --only functions,firestore:rules,firestore:indexes
```

Set `NIVOX_ALLOWED_ORIGINS` in the Functions runtime to the comma-separated
production and preview origins. In Paystack, set the webhook URL to the deployed
`paystackWebhook` function. Set the four public Function URLs from
`.env.example` in Vercel for Production, Preview, and Development as needed.

## Creating the first administrator

There is no default password or hardcoded administrator.

1. Register the intended administrator through `/register` and verify the email.
2. Install the Firebase CLI, sign in, and select the production project.
3. From `functions`, install dependencies with `npm ci`.
4. Authenticate Application Default Credentials in a trusted operator
   environment with permission to manage Firebase Authentication.
5. Run:

```text
node scripts/set-admin.js administrator@example.com
```

6. Sign out and back in so Firebase issues a new ID token containing
   `admin: true`.
7. Use `/admin/login`. The route and Firestore rules both require the custom
   claim; changing a user document cannot grant admin access.

For ongoing operations, run the bootstrap script only from a trusted machine or
CI secret context. Never ship service-account credentials to the browser.

## Vercel

Import the repository, use `npm run build`, and publish `dist`. The included
`vercel.json` provides the SPA fallback needed by React Router. Add the Vite
Function URL variables in Vercel before building.

Before production release, exercise registration, verification, login, a
Paystack test transaction, cancellation, duplicate-seat contention, admin
denial, and admin CRUD against the Firebase Emulator Suite and then the staging
Firebase project.
