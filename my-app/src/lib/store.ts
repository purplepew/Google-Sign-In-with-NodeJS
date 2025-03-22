import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authSlice from "../features/auth/authSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    middleware: defaultMiddleware => defaultMiddleware().concat(apiSlice.middleware)
})

// get the type of our store variable
export type AppStore = typeof store
// Infer the 'RootState' and 'AppDispatch' from the store itself
export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']