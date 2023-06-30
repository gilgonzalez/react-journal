import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status : 'checking', // 'not-authenticated', 'authenticated', 'checking'
    uid: null,
    email : null,
    displayName : null, 
    photoURL : null,
    errorMessage : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       login : (state, {payload}) => {
        state.displayName = payload.displayName;
        state.email = payload.email;
        state.photoURL = payload.photoURL;
        state.uid = payload.uid;
        state.status = 'authenticated';
        state.errorMessage = null;
       },
       logout : (state, {payload}) => {
        state.displayName = null;
        state.email = null;
        state.photoURL = null;
        state.uid = null;
        state.status = 'not-authenticated';
        state.errorMessage = payload?.errorMessage;
       },
       checkingCredentials : (state) => {
        state.status = 'checking'
       },
    }
});
export const { login, logout, checkingCredentials } = authSlice.actions;