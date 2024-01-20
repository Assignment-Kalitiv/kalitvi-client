import { createSlice } from '@reduxjs/toolkit'

const initialState = { show: false, message: '', severity: '' }

const alertSlice = createSlice({
    name: 'alertSlice',
    initialState,
    reducers: {
        set(state, data) {
            Object.assign(state, data.payload)
            state.show = true
        },
        clear(state) {
            Object.assign(state, initialState)
        }
    }
})

export const alertActions = alertSlice.actions;
export const alertReducer = alertSlice.reducer;