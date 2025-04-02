import { createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../../utilities/http';

export const login = createAsyncThunk(
    'user/login',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await post('auth/login', payload);

            return response;
        } catch (error: any | undefined) {
            return rejectWithValue(error.response || 'Fetch refund failure');
        }
    },
);
