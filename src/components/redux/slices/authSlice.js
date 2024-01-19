import { createSlice } from '@reduxjs/toolkit'

const initialState = { logged: false }

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login(state) {
            state.logged = true
        },
        logout(state) {
            state.logged = false
        }
    }
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;