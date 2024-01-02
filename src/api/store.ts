import { configureStore } from '@reduxjs/toolkit'

import { API } from './api'

export const store = configureStore({
    middleware: (gDM) => gDM().concat(API.middleware),
    reducer: {
        [API.reducerPath]: API.reducer
    }
})
