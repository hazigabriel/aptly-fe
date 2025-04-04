'use client';

import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import type { FormProps } from 'antd';
import { Button, Form, Input, Typography } from 'antd';
import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { register } from '@/lib/features/user/actions';
import { jwtDecode } from 'jwt-decode';

type FieldType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export const RegisterForm: React.FC<{ title?: string }> = ({ title }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { userToken, isLoading, isError, errorMessage } = useAppSelector(
        state => state.user,
    );

    useEffect(() => {
        if (userToken) {
            redirect('/dashboard');
        }
    }, [userToken]);

    const onFinish: FormProps<FieldType>['onFinish'] = ({
        passwordConfirm,
        ...values
    }) => {
        dispatch(register(values));
    };

    return (
        <div className="w-100 rounded-xl border border-gray-100 bg-white p-5 shadow-md">
            {title && (
                <Typography.Title className="pb-5 text-center" level={3}>
                    {title}
                </Typography.Title>
            )}
            <Form
                name="register"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <div className="flex gap-4">
                    <Form.Item<FieldType>
                        label="First Name"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please add your first name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Last Name"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please add your last name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </div>
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
                <Typography.Link
                    href="/login"
                    className="mb-5 flex justify-center"
                >
                    Already have an account? Log in here
                </Typography.Link>
                {isError ? (
                    <div className="flex justify-center">
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
