import { getAuth, signOut } from 'firebase/auth';
import React, { createContext, useState, useEffect } from 'react';

import { db } from 'firebaseApp';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [pending, setPending] = useState(true);
  const auth = getAuth();

  const logout = async () => {
    try {
      await signOut(auth); // Logout from Firebase Auth
      setCurrentUser(null); // Clear current user from state
      setUserRole(null); // Clear user role from state
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const updateEmail = async (email) => {
    try {
      await currentUser.updateEmail(email);
    } catch (error) {
      console.error('Failed to update email:', error);
    }
  };

  const updateProfile = async (profile) => {
    try {
      await currentUser.updateProfile({
        displayName: profile.displayName,
        photoURL: profile.photoURL,
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        // Fetch role from Firestore if the user is logged in
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserRole(userDoc.data().role);
        } else {
          // If the user doesn't exist in Firestore, create a new user and set role to PATIENT
          await db.collection('users').doc(user.uid).set({ role: 'PATIENT' });
          setUserRole('PATIENT');
        }
      } else {
        setUserRole(null); // Ensure user role is null if no user
      }

      setPending(false);
    });
  }, [auth]);

  if (pending) {
    return <>Loading...</>;
  }

  // Include logout in the context's value
  return (
    <AuthContext.Provider
      value={{ currentUser, userRole, logout, updateProfile, updateEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};
