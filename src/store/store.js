import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';

//configure the store
export const store = configureStore({
  reducer: {
    //here the reducers
    auth : authSlice.reducer
  },
});