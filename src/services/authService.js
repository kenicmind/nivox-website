import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

/**
 * Platform-Agnostic Authentication Service
 * Compatible with React Web and React Native
 */

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentAuthUser = () => {
  return auth.currentUser;
};

export const getEmailVerificationActionSettings = () => {
  const continueUrl = new URL('/login?verified=1', window.location.origin);
  return {
    url: continueUrl.toString(),
    // Firebase's hosted action handler is more reliable in iOS Mail/Safari
    // than trying to deep-link directly into the SPA.
    handleCodeInApp: false,
  };
};

export const getPasswordResetActionSettings = () => ({
  url: new URL('/login?reset=complete', window.location.origin).toString(),
  handleCodeInApp: false,
});

export const fetchUserProfile = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error in fetchUserProfile service:', error);
    throw error;
  }
};

export const saveUserProfile = async (uid, profileData) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const payload = {
      ...profileData,
      profileCompleted: true,
      updatedAt: serverTimestamp(),
    };
    await setDoc(userDocRef, payload, { merge: true });
    return payload;
  } catch (error) {
    console.error('Error in saveUserProfile service:', error);
    throw error;
  }
};
