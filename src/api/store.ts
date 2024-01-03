import { configureStore } from '@reduxjs/toolkit'

import { API } from './api'
import applicationSlice from './applicationSlice'

export const store = configureStore({
    middleware: (gDM) => gDM().concat(API.middleware),
    reducer: {
        application: applicationSlice,
        [API.reducerPath]: API.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
