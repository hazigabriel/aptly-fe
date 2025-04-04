import '@ant-design/v5-patch-for-react-19';
import './globals.css';

import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import theme from '@/app/theme/themeConfig';

import AntdRegistry from './AntdRegistry';
import StoreProvider from './StoreProvider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            >
                <StoreProvider>
                    <ConfigProvider theme={theme}>
                        <AntdRegistry>{children}</AntdRegistry>
                    </ConfigProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
