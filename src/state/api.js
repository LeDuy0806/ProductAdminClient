import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    reducerPath: 'adminApi',
    tagTypes: [
        'User',
        'Products',
        'Customers',
        'Transactions',
        'Geography',
        'Sales',
        'Admins',
        'Performance',
        'Dashboard'
    ],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `user/${id}`,
            providesTags: ['User']
        }),
        getProducts: build.query({
            query: () => 'client/products',
            providesTags: ['Products']
        }),
        getCustomers: build.query({
            query: () => 'user',
            providesTags: ['Customers']
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: 'client/transactions',
                method: 'GET',
                params: { page, pageSize, sort, search }
            }),
            providesTags: ['Transactions']
        }),
        getGeography: build.query({
            query: () => 'client/geography',
            providesTags: ['Geography']
        }),
        getSales: build.query({
            query: () => 'sales',
            providesTags: ['Sales']
        }),
        getAdmins: build.query({
            query: () => 'management/admins',
            providesTags: ['Admins']
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ['Performance']
        }),
        getDashboard: build.query({
            query: () => 'client/dashboard',
            providesTags: ['Dashboard']
        }),

        getAllUsers: build.query({
            query: () => ({
                url: `api/user`,
                method: 'GET'
            })
        }),

        createUser: build.mutation({
            query: (formData) => ({
                url: `api/user`,
                method: 'POST',
                body: formData
            })
        }),

        updateUser: build.mutation({
            query: ({ id, updateUser }) => ({
                url: `api/user/${id}`,
                method: 'PATCH',
                body: updateUser
            })
        }),

        deleteUser: build.mutation({
            query: (id) => ({
                url: `api/user/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,

    useGetAllUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation

    // useUpdateGameMutation,
    // useGetAllQuizesQuery,
    // useCreateQuizMutation,
    // useUpdateQuizMutation,
    // useDeleteQuizMutation,
    // useGetGamesQuery,
    // useCreateGameMutation,
    // useDeleteGameMutation
} = api;
