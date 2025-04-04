import { createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../../utilities/http';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
}

interface AuthResponse {
    access_token: string;
}

export const login = createAsyncThunk<AuthResponse, LoginPayload>(
    'user/login',
    async (payload: LoginPayload, { rejectWithValue }) => {
        try {
            const response: AuthResponse = await post('auth/login', {
                data: payload,
            });

            return response;
        } catch (error: any | undefined) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch refund failure',
            );
        }
    },
);

export const register = createAsyncThunk<AuthResponse, RegisterPayload>(
    'user/register',
    async (payload: RegisterPayload, { rejectWithValue }) => {
        try {
            const response: AuthResponse = await post('auth/register', {
                data: payload,
            });

            return response;
        } catch (error: any | undefined) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch refund failure',
            );
        }
    },
);
