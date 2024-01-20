import { createSlice } from '@reduxjs/toolkit'

const initialState = { index: 0 }

const navigationSlice = createSlice({
    name: 'navigationSlice',
    initialState,
    reducers: {
        set(state, data) {
            state.index = +data.payload
        }
    }
})

export const navigationActions = navigationSlice.actions;
export const navigationReducer = navigationSlice.reducer;