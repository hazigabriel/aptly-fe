'use client';

import type { FormProps } from 'antd';
import { Button, Form, Input, notification, Typography } from 'antd';
import React, { useEffect } from 'react';

import { forgotPassword } from '@/lib/features/user/actions';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

type FieldType = {
    email: string;
};

export const ForgotPasswordForm: React.FC<{ title?: string }> = ({ title }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { isLoading, isSuccess, isError, errorMessage } = useAppSelector(
        state => state.user,
    );

    useEffect(() => {
        if (isSuccess) {
            notification.success({
                message: 'Password Reset',
                description:
                    'We’ve sent a password reset email to your inbox. Please check your email and follow the instructions to reset your password.',
                placement: 'top',
            });
        }

        if (isError) {
            notification.error({
                message: 'Error',
                description: errorMessage,
                placement: 'top',
            });
        }
    }, [isSuccess, isError]);

    const onFinish: FormProps<FieldType>['onFinish'] = values => {
        dispatch(forgotPassword(values));
    };

    return (
        <div className="w-100 rounded-xl border border-gray-100 bg-white p-5 shadow-md">
            {title && (
                <Typography.Title className="pb-5 text-center" level={3}>
                    {title}
                </Typography.Title>
            )}
            <Form
                name="forgot-password"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                form={form}
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
                    href="/login"
                    className="mb-5 flex justify-center"
                >
                    Go back to login{' '}
                </Typography.Link>
            </Form>
        </div>
    );
};
