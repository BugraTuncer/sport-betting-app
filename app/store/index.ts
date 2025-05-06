import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import betReducer from './slices/betSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bet: betReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
