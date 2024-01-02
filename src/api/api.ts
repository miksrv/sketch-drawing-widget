import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// type Maybe<T> = T | void

export const API = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/',
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
        activityGetList: builder.query<any, any>({
            providesTags: (result, error, arg) => [
                { id: arg?.place || arg?.author, type: 'Sketches' }
            ],
            query: (params) => 'activity'
        })
    }),
    reducerPath: 'api',
    tagTypes: ['Sketches']
})

// Export hooks for usage in functional components
export const {
    util: { getRunningQueriesThunk }
} = API
