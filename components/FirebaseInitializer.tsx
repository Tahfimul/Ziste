"use client";
import { useEffect, ReactNode } from 'react';
import { isSupported, initializeAnalytics } from 'firebase/analytics';
import { app } from '../services/firebase';

interface FirebaseInitializerProps {
  children: ReactNode;
}

const FirebaseInitializer: React.FC<FirebaseInitializerProps> = ({ children }) => {
  useEffect(() => {
    const setupAnalytics = async () => {
      // Check if the code is running in a browser
      if (typeof window !== 'undefined' && await isSupported()) {
        initializeAnalytics(app);
      }
    };

    setupAnalytics();
  }, []);

  return <>{children}</>;
};

export default FirebaseInitializer;
