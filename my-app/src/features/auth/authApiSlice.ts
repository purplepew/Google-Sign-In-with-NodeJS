import apiSlice from "../../lib/apiSlice";
import { logout } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        refresh: builder.mutation<{ accessToken: string }, void>({
            query: () => ({
                url: '/auth/refresh',
                credentials: 'include',
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                credentials: 'include'
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try {
                    await queryFulfilled
                    dispatch(apiSlice.util.resetApiState())
                    dispatch(logout())
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const { useRefreshMutation, useLogoutMutation } = authApiSlice

export default authApiSlice