import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getBaseUrl } from "../../../utils/baseURL"

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser
            })
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        }),
        logoutUser: builder.mutation({
            query: (credentials) => ({
                url: "/logout",
                method: "POST",
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: "/users",
                method: "POST",
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
        updateUserRole: builder.mutation({
            query: ({userId, role}) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: {role}
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"],
        }),
        editProfile: builder.mutation({
            query: (profileData) => ({
                url: `/edit-profile`,
                method: "PATCH",
                body: profileData 
            }),
        })
    }),
})
 
export const {useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation,
    useGetUserQuery, useDeleteUserMutation, useUpdateUserRoleMutation, useEditprofileMutation
} = authApi;
export default authApi;