import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import * as ApiType from './types'

export const API = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST || 'http://localhost:8000/api/',
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
        sketchCreate: builder.mutation<void, ApiType.RequestPostSketch>({
            invalidatesTags: () => [{ type: 'Sketch' }],
            query: (data) => ({
                body: data,
                method: 'POST',
                url: '/'
            }),
            transformErrorResponse: (response) => response.data
        }),
        sketchDelete: builder.mutation<void, string>({
            invalidatesTags: () => [{ type: 'Sketch' }],
            query: (id) => ({
                method: 'DELETE',
                url: `/${id}`
            }),
            transformErrorResponse: (response) => response.data
        }),
        sketchGetList: builder.query<ApiType.ResponseGetList, void>({
            providesTags: ['Sketch'],
            query: () => '/'
        }),
        sketchModify: builder.mutation<void, any>({
            invalidatesTags: (res, err, arg) => [
                { id: arg.place, type: 'Sketch' }
            ],
            query: (data) => ({
                body: data,
                method: 'PUT',
                url: '/'
            }),
            transformErrorResponse: (response) => response.data
        })
    }),
    reducerPath: 'api',
    tagTypes: ['Sketch']
})

export const {
    util: { getRunningQueriesThunk }
} = API
