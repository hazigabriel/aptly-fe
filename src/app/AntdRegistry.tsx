// app/AntdRegistry.tsx
'use client';

import '@ant-design/v5-patch-for-react-19';

import { AntdRegistry as AntdNextJsRegistry } from '@ant-design/nextjs-registry';
import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';

// added from https://ant.design/docs/react/v5-for-19
if (typeof window !== 'undefined') {
    unstableSetRender((node, container) => {
        container._reactRoot ||= createRoot(container);
        const root = container._reactRoot;
        root.render(node);
        return async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            root.unmount();
        };
    });
}

export default function AntdRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AntdNextJsRegistry>{children}</AntdNextJsRegistry>;
}
