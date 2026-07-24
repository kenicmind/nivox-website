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

## Mobile email-action setup

Password-reset and verification emails use Firebase's hosted action handler,
which is intentionally more reliable when a link is opened from iOS Mail into
Safari. In Firebase Console → Authentication → Settings → Authorized domains,
add every real browser origin used by NIVOX, including both the apex and `www`
host if both are used:

```text
your-production-domain.example
www.your-production-domain.example
```

Do not generate production emails while the app is running on `localhost` or an
unregistered LAN IP. For local device testing, add the exact HTTPS preview
domain to Authorized domains and open that domain on the iPhone. The action
handler returns users to `/login?verified=1` or `/login?reset=complete`; the
login page consumes these parameters and removes them from the address bar.

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

The booking flow claims a seat for a short payment hold before opening Paystack.
The trusted finalization Function validates the original booking metadata,
Paystack reference, amount, user, and seat hold before changing the hold into an
upcoming reservation. Do not call the Functions directly with a service-account
credential from the browser.

## Creating the first administrator

There is no default password or hardcoded administrator.

1. Install the Firebase CLI, sign in, and select the production project.
2. From `functions`, install dependencies with `npm ci`.
3. Authenticate Application Default Credentials in a trusted operator
   environment with permission to manage Firebase Authentication.
4. Set the password only in the trusted shell environment. Do not commit it,
   put it in Vite variables, or send it through chat.
5. Run:

```text
NIVOX_ADMIN_PASSWORD="replace-with-your-secure-password" node scripts/create-admin.js kenicmind@gmail.com
```

6. Firebase creates `kenicmind@gmail.com`, assigns the `admin: true` custom
   claim, and writes `users/{uid}.role` as `admin`.
7. Send a verification email from Firebase Authentication (or use the
   configured verification flow), then verify the address.
8. Open `/admin/login` directly. It is intentionally absent from public
   navigation and the student login page.
9. Successful administrator login redirects to `/admin/dashboard`.

The script refuses to overwrite an existing account or password. If the
account already exists, use the promotion command below instead.

## Promoting another administrator

The promotion process is deliberately server-side. Ensure the user has already
registered and verified their email, then run the same trusted script:

```text
cd functions
node scripts/set-admin.js another-administrator@example.com
```

The user must sign out and sign back in to receive a refreshed ID token.

Firebase Authentication custom claims are the authorization source of truth:
`request.auth.token.admin == true`. The `users/{uid}` document in the Firestore
`users` collection stores a server-maintained `role: "admin"` mirror for admin
profile display and reporting. Editing that document alone never grants access.

The checked-in `firestore.rules` already enforces the custom claim for admin
data. Deploy it after promoting the first administrator:

```text
firebase deploy --only firestore:rules
```

Student registration can create only `role: "student"`, and student clients
cannot change their role. All active admin pages are wrapped by the admin route
guard; all student portal pages redirect authenticated admins to
`/admin/dashboard`.

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
### Spark-plan administrator bootstrap (development only)

Local development does not require Cloud Functions, Artifact Registry, or the
Firebase Blaze plan. `.env.development` enables a development-only Firestore
role fallback. Sign in with an existing verified account, open
`/admin/bootstrap`, and claim the one-time administrator slot.

Deploy `firestore.rules` before using the page against the Firebase project.
The transaction creates `system/adminConfig` and merges `role: "admin"` into
the existing `users/{uid}` profile. The rules allow this transition only when
both writes occur atomically and no bootstrap configuration exists.

Never enable `VITE_ALLOW_DEV_ADMIN_BOOTSTRAP` in production. Production should
use the Firebase custom claim `admin: true`; the application already gives that
claim priority. Before production, promote the selected UID with trusted Admin
SDK tooling and deploy without the development flag.

### Local Paystack development

Paystack verification still requires trusted server code, but it can run in the
Firebase Functions emulator without Blaze or Artifact Registry. Install the
Functions dependencies, place a Paystack **test** secret in
`functions/.secret.local` as `PAYSTACK_SECRET_KEY=...`, and start:

`npx firebase-tools emulators:start --only auth,firestore,functions --project nivoxhub`

The development environment points payment requests to port `5001`. Restart
Vite after changing environment files. Never expose `PAYSTACK_SECRET_KEY` in a
`VITE_` variable or commit `functions/.secret.local`.
