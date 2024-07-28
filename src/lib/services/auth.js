import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9090/api/v1/auth/" }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'sign-up',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
        verifyEmail: builder.mutation({
            query: (otp) => {
                return {
                    url: 'verify-email',
                    method: 'POST',
                    body: otp,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
        loginUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'sign-in',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json'
                    },
                    credentials: 'include'
                }
            }
        }),

        userProfile: builder.query({
            query: () => {
                return {
                    url: 'me',
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    credentials: 'include'
                }
            }
        }),
        changePassword: builder.mutation({
            query: (data) => {

                return {
                    url: `change-password`,
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-type': 'application/json'
                    },
                    credentials: 'include'
                }
            }
        }),
        logOutUser: builder.mutation({
            query: () => {
                return {
                    url: 'logout',
                    method: 'POST',
                    body: {},
                    headers: {
                        'Content-type': 'application/json'
                    },
                    credentials: 'include'
                }
            }
        }),
        resetPasswordLink: builder.mutation({
            query: (email) => {
                return {
                    url: 'reset-password-link',
                    method: 'POST',
                    body: email,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
        resetPassword: builder.mutation({
            query: (data) => {
                const { id, token, ...values } = data
                const body = { ...values }
                return {
                    url: `reset-password/${id}/${token}`,
                    method: 'POST',
                    body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
    }),
})


export const { useCreateUserMutation, useVerifyEmailMutation, useLoginUserMutation, useUserProfileQuery, useChangePasswordMutation, useLogOutUserMutation, useResetPasswordLinkMutation, useResetPasswordMutation } = authApi