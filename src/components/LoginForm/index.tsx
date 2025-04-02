'use client';

import type { FormProps } from 'antd';
import { Button, Form, Input, Typography } from 'antd';
import React, { useEffect } from 'react';
import { post } from "../../utilities/http"
type FieldType = {
    email?: string;
    password?: string;
};

export const LoginForm: React.FC<{ title?: string }> = ({ title }) => {
    useEffect(() => {
        const fetchRandomImage = async () => {
            try {
                const data = await post<{ message: string }>('auth/login', {data: {email: 'test@test.com', password: '123'}});
                console.log(data); // Set the random image URL to state
            } catch (error) {
                console.error('Error fetching random image:', error);
            }
        };

        fetchRandomImage();
        
    },[])
    const onFinish: FormProps<FieldType>['onFinish'] = values => {
        console.log('Success:', values);
    };
    // breeds/image/random
    
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
                name="login"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
            </Form>
        </div>
    );
};
