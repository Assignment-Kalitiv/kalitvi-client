import { createSlice } from '@reduxjs/toolkit'

const AUTH_ITEM = 'auth-item'

function getUserData() {
    const userDataJson = localStorage.getItem(AUTH_ITEM) || '';
    let res = null;
    if (userDataJson) {
        res = JSON.parse(userDataJson);
    }
    return res;
}

const initialState = { userData: getUserData() }

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login(state, data) {
            localStorage.setItem(AUTH_ITEM, JSON.stringify(data.payload))
            state.userData = data.payload
        },
        logout(state) {
            localStorage.removeItem(AUTH_ITEM)
            state.userData = null
        }
    }
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;