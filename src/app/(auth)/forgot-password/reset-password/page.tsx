import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import React from 'react';

import { LoginForm, ResetPasswordForm } from '@/components';

const ResetPasswordPage: React.FC = () => {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex h-screen w-screen flex-row gap-8 rounded-lg p-4 shadow-md">
                <div className="lg:md-0 ml-0 flex w-full flex-col items-center justify-center md:ml-4 md:w-1/2 lg:w-3/5">
                    <Title level={3}>Set a New Password 🔒</Title>
                    <Paragraph className="w-100 pb-5 text-center">
                        Almost there! Enter a strong new password below to
                        secure your Aptly account.
                    </Paragraph>

                    <ResetPasswordForm />
                </div>

                <div className="hidden h-full w-3/5 items-center justify-center rounded-lg bg-indigo-200 p-5 md:flex md:w-1/2 lg:w-2/5">
                    <img
                        src="../undraw_searching.svg"
                        alt="Illustration"
                        className="rounded object-contain sm:w-50 md:h-100 md:w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
