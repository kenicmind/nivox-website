import { doc, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

export const developmentAdminRolesEnabled = (
  import.meta.env.DEV && import.meta.env.VITE_ALLOW_DEV_ADMIN_BOOTSTRAP === 'true'
);

export const hasDevelopmentAdminRole = async (uid) => {
  if (!developmentAdminRolesEnabled || !uid) return false;
  try {
    const [profile, config] = await Promise.all([
      getDoc(doc(db, 'users', uid)),
      getDoc(doc(db, 'system', 'adminConfig')),
    ]);
    return profile.exists()
      && profile.data().role === 'admin'
      && config.exists()
      && config.data().configured === true
      && config.data().configuredBy === uid
      && config.data().authorizationMode === 'development-firestore-role';
  } catch (error) {
    if (import.meta.env.DEV) console.error('Development administrator role check failed:', error);
    return false;
  }
};

export const bootstrapCurrentUserAsAdmin = async () => {
  const user = auth.currentUser;
  if (!developmentAdminRolesEnabled) {
    throw new Error('Development admin bootstrap is disabled.');
  }
  if (!user) throw new Error('Sign in before configuring the administrator.');

  await runTransaction(db, async (transaction) => {
    const configRef = doc(db, 'system', 'adminConfig');
    const profileRef = doc(db, 'users', user.uid);
    const [config, profile] = await Promise.all([
      transaction.get(configRef),
      transaction.get(profileRef),
    ]);
    if (config.exists() && config.data().configured === true) {
      throw new Error('Administrator already configured.');
    }
    transaction.set(configRef, {
      configured: true,
      configuredBy: user.uid,
      configuredAt: serverTimestamp(),
      authorizationMode: 'development-firestore-role',
    });
    if (profile.exists()) {
      transaction.update(profileRef, {
        role: 'admin',
        adminGrantedAt: serverTimestamp(),
      });
    } else {
      transaction.set(profileRef, {
        uid: user.uid,
        email: user.email || '',
        fullName: user.displayName || '',
        role: 'admin',
        profileCompleted: false,
        createdAt: serverTimestamp(),
        adminGrantedAt: serverTimestamp(),
      });
    }
  });
  return { ok: true };
};
