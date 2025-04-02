import { createSlice } from '@reduxjs/toolkit';

import { login } from './actions';


interface UserState {
    userData: any;  
    isLoading: boolean;
    isError: boolean;
    errorMessage: string | null | undefined; 
}

const initialState: UserState = {
    userData: null,
    isLoading: false,
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
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.userData = payload;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            });
    },
});

// export const {
 
// } = userSlice.actions;

export default userSlice.reducer;
