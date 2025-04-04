import { createAsyncThunk } from '@reduxjs/toolkit';

import { post } from '../../../utilities/http';

interface AuthResponse {
    access_token: string;
}

interface MessageResponse {
    message: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    token: string;
    newPassword: string;
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

export const forgotPassword = createAsyncThunk<
    MessageResponse,
    ForgotPasswordPayload
>(
    'user/forgot-password',
    async (payload: ForgotPasswordPayload, { rejectWithValue }) => {
        try {
            const response: MessageResponse = await post(
                'auth/forgot-password',
                {
                    data: payload,
                },
            );

            return response;
        } catch (error: any | undefined) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch refund failure',
            );
        }
    },
);

export const resetPassword = createAsyncThunk<
    MessageResponse,
    ResetPasswordPayload
>(
    'user/forgot-password',
    async (payload: ResetPasswordPayload, { rejectWithValue }) => {
        try {
            const response: MessageResponse = await post(
                'auth/reset-password',
                {
                    data: payload,
                },
            );

            return response;
        } catch (error: any | undefined) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch refund failure',
            );
        }
    },
);
