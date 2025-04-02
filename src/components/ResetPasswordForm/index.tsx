'use client';

import type { FormProps } from 'antd';
import { Button, Form, Input, Typography } from 'antd';
import React from 'react';

type FieldType = {
    password?: string;
    passwordConfirm?: string;
};

export const ResetPasswordForm: React.FC<{ title?: string }> = ({ title }) => {
    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = values => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] =
        errorInfo => {
            console.log('Failed:', errorInfo);
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
                onFinishFailed={onFinishFailed}
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
                    >
                        Submit
                    </Button>
                </Form.Item>
                <Typography.Link
                    href="/login"
                    className="mb-5 flex justify-center"
                >
                    All set? Log in now{' '}
                </Typography.Link>
            </Form>
        </div>
    );
};
