import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, logEvent, type Analytics } from 'firebase/analytics';
import type { CartEventParams, MatchDetailEventParams } from '~/models/events';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const logMatchDetailView = (params: MatchDetailEventParams) => {
  if (analytics) {
    console.log('Logging match detail view');
    logEvent(analytics, 'match_detail_view', params);
  }
};

export const logAddToBetSlip = (params: CartEventParams) => {
  if (analytics) {
    console.log('Logging add to bet slip');
    logEvent(analytics, 'add_to_bet_slip', params);
  }
};

export const logRemoveFromBetSlip = (params: CartEventParams) => {
  if (analytics) {
    console.log('Logging remove from bet slip');
    logEvent(analytics, 'remove_from_bet_slip', params);
  }
};

export default app;
