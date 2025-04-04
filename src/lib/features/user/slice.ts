import { createSlice } from '@reduxjs/toolkit';

import { forgotPassword, login, register } from './actions';

interface UserState {
    userData: any;
    userToken: string | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string | null | undefined;
}

const initialState: UserState = {
    userData: null,
    userToken: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.userData = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.userToken = payload.access_token;
                localStorage.setItem('access_token', payload.access_token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.errorMessage = action.payload as string;
            })
            .addCase(register.pending, state => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.userData = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.userToken = payload.access_token;
                localStorage.setItem('access_token', payload.access_token);
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.errorMessage = action.payload as string;
            })
            .addCase(forgotPassword.pending, state => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(forgotPassword.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.errorMessage = action.payload as string;
            });
    },
});

// export const {

// } = userSlice.actions;

export default userSlice.reducer;
