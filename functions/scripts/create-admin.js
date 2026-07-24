const { applicationDefault, initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { FieldValue, getFirestore } = require('firebase-admin/firestore');

initializeApp({ credential: applicationDefault() });

const email = String(process.argv[2] || '').trim().toLowerCase();
const password = process.env.NIVOX_ADMIN_PASSWORD;

if (!email || !email.includes('@')) {
  console.error('Usage: NIVOX_ADMIN_PASSWORD="your-password" node scripts/create-admin.js admin@example.com');
  process.exitCode = 1;
} else if (!password || password.length < 6) {
  console.error('Set NIVOX_ADMIN_PASSWORD to a secure Firebase password of at least 6 characters.');
  process.exitCode = 1;
} else {
  const auth = getAuth();
  auth.createUser({
    email,
    password,
    displayName: 'NIVOX Administrator',
    emailVerified: false,
  })
    .then(async (user) => {
      await auth.setCustomUserClaims(user.uid, { admin: true });
      await getFirestore().doc(`users/${user.uid}`).set({
        uid: user.uid,
        email,
        fullName: 'NIVOX Administrator',
        role: 'admin',
        membership: 'Administrator',
        profileCompleted: true,
        emailVerified: false,
        createdAt: FieldValue.serverTimestamp(),
        adminGrantedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
      console.log(`Created Firebase administrator ${email}.`);
      console.log('Verify the email before signing in at /admin/login.');
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-exists') {
        console.error('That email already exists. Use scripts/set-admin.js to promote it without changing its password.');
      } else {
        console.error(error);
      }
      process.exitCode = 1;
    });
}
