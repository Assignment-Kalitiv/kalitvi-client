import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { useSelector } from "react-redux";
import { navigationReducer } from "./slices/navigationSlice";
import { alertReducer } from "./slices/alertSlice";

export const store = configureStore({
    reducer: {
        authState: authReducer,
        navigationState: navigationReducer,
        alertState: alertReducer
    }
});

export function useSelectorAuth() {
    return useSelector(state => state.authState.userData);
}

export function useSelectorNavigation() {
    return useSelector(state => state.navigationState.index);
}

export function useSelectorAlert() {
    return useSelector(state => state.alertState);
}