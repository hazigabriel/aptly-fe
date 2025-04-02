import { configureStore } from '@reduxjs/toolkit';
import { user } from './features';
export const makeStore = () => {
    return configureStore({
        reducer: { user },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
