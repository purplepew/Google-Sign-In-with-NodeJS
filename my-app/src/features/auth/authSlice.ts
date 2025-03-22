import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../lib/store";

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken;
        },
        logout: (state) => {
            state.token = null
        }
    }
})

export const { setCredentials, logout } = authSlice.actions

export const selectCurrentToken = (state: RootState) => state.auth.token

export default authSlice.reducer