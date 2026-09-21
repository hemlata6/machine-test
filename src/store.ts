import { configureStore } from '@reduxjs/toolkit';
import authReducer from './components/redux/slice/LoginSlice';
import visitorsReducer from './components/redux/slice/visiterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    visiter: visitorsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
