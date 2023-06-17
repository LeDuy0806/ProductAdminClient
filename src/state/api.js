import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
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
        'Dashboard',
    ],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `api/user/${id}`,
            providesTags: ['User'],
        }),
        getProducts: build.query({
            query: () => 'api/products',
            providesTags: ['Products'],
        }),
        getCustomers: build.query({
            query: () => 'client/customers',
            providesTags: ['Customers'],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: 'client/transactions',
                method: 'GET',
                params: { page, pageSize, sort, search },
            }),
            providesTags: ['Transactions'],
        }),
        getGeography: build.query({
            query: () => 'client/geography',
            providesTags: ['Geography'],
        }),
        getSales: build.query({
            query: () => 'sales/sales',
            providesTags: ['Sales'],
        }),
        getAdmins: build.query({
            query: () => 'management/admins',
            providesTags: ['Admins'],
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ['Performance'],
        }),
        getDashboard: build.query({
            query: () => 'general/dashboard',
            providesTags: ['Dashboard'],
        }),

        getAllUsers: build.query({
            query: () => ({
                url: `api/user`,
                method: 'GET',
            }),
        }),

        createUser: build.mutation({
            query: (formData) => ({
                url: `api/users`,
                method: 'POST',
                body: formData,
            }),
        }),

        updateUser: build.mutation({
            query: ({ id, updateUser }) => ({
                url: `api/users/${id}`,
                method: 'PATCH',
                body: updateUser,
            }),
        }),

        deleteUser: build.mutation({
            query: (id) => ({
                url: `api/users/${id}`,
                method: 'DELETE',
            }),
        }),

        getAllQuizes: build.query({
            query: () => ({
                url: `api/quizzes`,
                method: 'GET',
            }),
        }),

        createQuiz: build.mutation({
            query: (formData) => ({
                url: `api/quizzes`,
                method: 'POST',
                body: formData,
            }),
        }),

        updateQuiz: build.mutation({
            query: ({ id, updateQuiz }) => ({
                url: `api/quizzes/${id}`,
                method: 'PATCH',
                body: updateQuiz,
            }),
        }),

        deleteQuiz: build.mutation({
            query: (id) => ({
                url: `api/quizzes/${id}`,
                method: 'DELETE',
            }),
        }),

        getGames: build.query({
            query: () => ({
                url: `api/games`,
                method: 'GET',
            }),
        }),

        createGame: build.mutation({
            query: (formData) => ({
                url: `api/games`,
                method: 'POST',
                body: formData,
            }),
        }),

        updateGame: build.mutation({
            query: ({ id, updateGame }) => ({
                url: `api/games/${id}`,
                method: 'PATCH',
                body: updateGame,
            }),
        }),

        deleteGame: build.mutation({
            query: (id) => ({
                url: `api/games/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
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
    useUpdateGameMutation,
    useDeleteUserMutation,

    useGetAllQuizesQuery,
    useCreateQuizMutation,
    useUpdateQuizMutation,
    useDeleteQuizMutation,

    useGetGamesQuery,
    useCreateGameMutation,
    useUpdateUserMutation,
    useDeleteGameMutation,
} = api;
