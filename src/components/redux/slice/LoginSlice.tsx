import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  isAuthenticated: boolean;
}

const storedEmail = localStorage.getItem('userEmail');

const initialState: AuthState = {
  email: storedEmail || null,
  isAuthenticated: !!storedEmail,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.email = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
