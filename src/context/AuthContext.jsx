import { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  loginWithGoogle as firebaseLoginGoogle, 
  loginWithEmail as firebaseLoginEmail,
  signUpWithEmail as firebaseSignUp,
  logout as firebaseLogout,
  loginAnonymously as firebaseLoginAnonymously
} from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await firebaseLoginGoogle();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await firebaseLoginEmail(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email, password, displayName) => {
    try {
      await firebaseSignUp(email, password, displayName);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const loginAnonymously = async () => {
    try {
      const result = await firebaseLoginAnonymously();
      // Initialize guest calculation count
      const guestKey = `guest_calculations_${result.uid}`;
      if (!localStorage.getItem(guestKey)) {
        localStorage.setItem(guestKey, '0');
      }
      return result;
    } catch (error) {
      console.error('Anonymous login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseLogout();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      loginWithGoogle, 
      loginWithEmail,
      signUpWithEmail,
      loginAnonymously,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
