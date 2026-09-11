import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  isAuthenticated: boolean;
}

const storedEmail = localStorage.getItem('userEmail');
console.log("storedEmail", storedEmail)
const initialState: AuthState = {
  email: storedEmail || null,
  isAuthenticated: !!storedEmail,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        console.log("action.payload", action.payload)
      state.email = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
