'use client';

import type { FormProps } from 'antd';
import { Button, Form, Input, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { login } from '@/lib/features/user/actions';
import { redirect } from 'next/navigation';

type FieldType = {
    email: string;
    password: string;
};

export const LoginForm: React.FC<{ title?: string }> = ({ title }) => {
    const dispatch = useAppDispatch();
    const { userToken, isLoading, isError, errorMessage } = useAppSelector(
        state => state.user,
    );

    useEffect(() => {
        if (userToken) {
            redirect('/dashboard');
        }
    }, [userToken]);

    const onFinish: FormProps<FieldType>['onFinish'] = values => {
        dispatch(login(values));
    };

    return (
        <div
            className={`w-100 rounded-xl border bg-white p-5 shadow-md transition ${isError ? 'border-red-200' : 'border-gray-100'}`}
        >
            {title && (
                <Typography.Title className="pb-5 text-center" level={3}>
                    {title}
                </Typography.Title>
            )}
            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please input a valid email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,

                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Typography.Link
                    href="/forgot-password"
                    className="flex justify-end"
                >
                    Forgot password?
                </Typography.Link>

                <Form.Item label={null} className="flex justify-center">
                    <Button
                        type="default"
                        htmlType="submit"
                        className="mt-5 w-100 max-w-xs"
                        loading={isLoading}
                    >
                        Submit
                    </Button>
                </Form.Item>
                <Typography.Link
                    href="/register"
                    className="mb-5 flex justify-center"
                >
                    Don't have an account? Register here
                </Typography.Link>
                {isError ? (
                    <div className="w-100 max-w-xs text-center">
                        <Typography.Text type="danger">
                            {errorMessage}
                        </Typography.Text>
                    </div>
                ) : (
                    ''
                )}
            </Form>
        </div>
    );
};
