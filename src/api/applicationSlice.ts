import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SketchData } from 'components/sketch-form/types'

type applicationSliceType = {
    editSketch?: SketchData
}

const initialState: applicationSliceType = {
    editSketch: undefined
}

export const applicationSlice = createSlice({
    initialState,
    name: 'counter',
    reducers: {
        editSketch: (state, action: PayloadAction<SketchData | undefined>) => {
            state.editSketch = action.payload
        }
    }
})

export const { editSketch } = applicationSlice.actions

export default applicationSlice.reducer
