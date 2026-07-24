const { applicationDefault, initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { FieldValue, getFirestore } = require('firebase-admin/firestore');

initializeApp({ credential: applicationDefault() });

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/set-admin.js admin@example.com');
  process.exitCode = 1;
} else {
  getAuth()
    .getUserByEmail(email)
    .then(async (user) => {
      await getAuth().setCustomUserClaims(user.uid, {
        ...(user.customClaims || {}),
        admin: true,
      });
      await getFirestore().doc(`users/${user.uid}`).set({
        role: 'admin',
        adminGrantedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
    })
    .then(() => console.log(`Admin claim granted to ${email}.`))
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
