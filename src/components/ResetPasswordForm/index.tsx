'use client';

import { resetPassword } from '@/lib/features/user/actions';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import type { FormProps } from 'antd';
import { Button, Form, Input, notification, Typography } from 'antd';
import { redirect, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

type FieldType = {
    password: string;
    passwordConfirm: string;
};

export const ResetPasswordForm: React.FC<{ title?: string }> = ({ title }) => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { isLoading, isSuccess, isError, errorMessage } = useAppSelector(
        state => state.user,
    );

    useEffect(() => {
        if (isSuccess) {
            notification.success({
                message: 'Password Reset Successful',
                description:
                    'Your password has been reset. You will be redirected to the login page shortly.',
                placement: 'top',
                key: token as string,
                onClose: () => {
                    notification.destroy(token as string);
                    redirect('/login');
                },
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
        if (!token) {
            notification.error({
                message: 'Error',
                description:
                    'The token is missing from the URL. Please follow the link in your email to reset your password.',
                placement: 'top',
            });
            return;
        }

        const data = {
            token: token as string,
            newPassword: values.password,
        };
        dispatch(resetPassword(data));
    };

    return (
        <div className="w-100 rounded-xl border border-gray-100 bg-white p-5 shadow-md">
            {title && (
                <Typography.Title className="pb-5 text-center" level={3}>
                    {title}
                </Typography.Title>
            )}
            <Form
                name="reset-password"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
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

                <Form.Item<FieldType>
                    label="Confirm password"
                    name="passwordConfirm"
                    rules={[
                        {
                            required: true,

                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        'The new password that you entered do not match!',
                                    ),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
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
                {isSuccess ? (
                    <Typography.Link
                        href="/login"
                        className="mb-5 flex justify-center"
                    >
                        Great! Log into Aptly{' '}
                    </Typography.Link>
                ) : (
                    ''
                )}
            </Form>
        </div>
    );
};
