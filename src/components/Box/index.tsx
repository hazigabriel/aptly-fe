import React, { ReactNode } from 'react';

export const Box: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col gap-4 rounded-lg bg-white p-5 shadow-md">
            {children}
        </div>
    );
};
