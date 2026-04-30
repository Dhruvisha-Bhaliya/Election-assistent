import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};

// Function to validate config (Checks if API Key exists and is not the placeholder)
const isValidConfig = (config: typeof firebaseConfig) => {
  return config.apiKey && config.apiKey !== 'your_api_key' && config.apiKey.startsWith('AIza');
};

let app;

try {
  if (getApps().length > 0) {
    app = getApp();
  } else if (isValidConfig(firebaseConfig)) {
    app = initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully with Project ID:", firebaseConfig.projectId);
  } else {
    console.error("Firebase Configuration is invalid or missing. Check your .env.local file.");
    app = null;
  }
} catch (error) {
  console.error("Error during Firebase initialization:", error);
  app = null;
}

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export { app };