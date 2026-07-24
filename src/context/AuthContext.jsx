import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import {
  browserLocalPersistence,
  onIdTokenChanged,
  setPersistence,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { hasDevelopmentAdminRole } from '../services/adminService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};
    let active = true;

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        if (!active) return;
        unsubscribe = onIdTokenChanged(
          auth,
          async (nextUser) => {
            if (!active) return;
            if (!nextUser) {
              setUser(null);
              setIsAdmin(false);
              setAuthInitialized(true);
              return;
            }

            try {
              const token = await nextUser.getIdTokenResult();
              if (!active) return;
              const developmentAdmin = token.claims.admin === true
                ? false
                : await hasDevelopmentAdminRole(nextUser.uid);
              if (!active) return;
              setUser(nextUser);
              setIsAdmin(token.claims.admin === true || developmentAdmin);
            } catch {
              await signOut(auth).catch(() => undefined);
              if (!active) return;
              setUser(null);
              setIsAdmin(false);
            } finally {
              if (active) setAuthInitialized(true);
            }
          },
          async () => {
            await signOut(auth).catch(() => undefined);
            if (!active) return;
            setUser(null);
            setIsAdmin(false);
            setAuthInitialized(true);
          },
        );
      })
      .catch(async () => {
        await signOut(auth).catch(() => undefined);
        if (!active) return;
        setUser(null);
        setIsAdmin(false);
        setAuthInitialized(true);
      });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const signOutUser = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAdmin,
      authInitialized,
      signOutUser,
    }),
    [user, isAdmin, authInitialized, signOutUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
