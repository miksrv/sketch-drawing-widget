import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// type Maybe<T> = T | void

export const API = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST || 'http://localhost:8080/api/',
        // prepareHeaders: (headers, { getState }) => {
        //     // By default, if we have a token in the store, let's use that for authenticated requests
        //     const token = (getState() as RootState).auth.token
        //
        //     if (token) {
        //         headers.set('Authorization', token)
        //     }
        //
        //     return headers
        // },
        responseHandler: 'content-type'
    }),
    endpoints: (builder) => ({
        sketchCreate: builder.mutation<void, any>({
            invalidatesTags: (res, err, arg) => [
                { id: arg.place, type: 'Sketch' }
            ],
            query: (data) => ({
                body: data,
                method: 'POST',
                url: 'sketch'
            }),
            transformErrorResponse: (response) => response.data
        }),
        sketchDelete: builder.mutation<void, any>({
            invalidatesTags: (res, err, arg) => [
                { id: arg.place, type: 'Sketch' }
            ],
            query: (data) => ({
                body: data,
                method: 'DELETE',
                url: 'sketch'
            }),
            transformErrorResponse: (response) => response.data
        }),
        sketchGetByID: builder.query<any, any>({
            providesTags: (result, error, arg) => [{ type: 'Sketch' }],
            query: (params) => 'sketch'
        }),
        sketchGetList: builder.query<any, any>({
            providesTags: (result, error, arg) => [{ type: 'Sketch' }],
            query: (params) => 'sketch'
        }),
        sketchModify: builder.mutation<void, any>({
            invalidatesTags: (res, err, arg) => [
                { id: arg.place, type: 'Sketch' }
            ],
            query: (data) => ({
                body: data,
                method: 'PUT',
                url: 'sketch'
            }),
            transformErrorResponse: (response) => response.data
        })
    }),
    reducerPath: 'api',
    tagTypes: ['Sketch']
})

// Export hooks for usage in functional components
export const {
    util: { getRunningQueriesThunk }
} = API
