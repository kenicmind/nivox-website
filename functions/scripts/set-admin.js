const { applicationDefault, initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { FieldValue, getFirestore } = require('firebase-admin/firestore');

initializeApp({ credential: applicationDefault() });

const email = String(process.argv[2] || '').trim().toLowerCase();

if (!email || !email.includes('@')) {
  console.error('Usage: node scripts/set-admin.js user@example.com');
  process.exitCode = 1;
} else {
  const auth = getAuth();
  auth.getUserByEmail(email)
    .then(async (user) => {
      const existingClaims = user.customClaims || {};
      await auth.setCustomUserClaims(user.uid, { ...existingClaims, admin: true });
      await getFirestore().doc(`users/${user.uid}`).set({
        uid: user.uid,
        email: user.email || email,
        role: 'admin',
        adminGrantedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
      console.log(`Promoted existing Firebase user ${user.email || email} (${user.uid}) to admin.`);
      console.log('Existing profile fields and authentication credentials were preserved.');
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        console.error(`No existing Firebase Authentication user was found for ${email}. No account was created.`);
      } else {
        console.error(error);
      }
      process.exitCode = 1;
    });
}
