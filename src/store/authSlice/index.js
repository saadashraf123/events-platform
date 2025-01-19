import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    user: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { token, ...user } = action.payload;
            state.token = token;
            state.user = user;
        },
        logout: (state) => {
            state.token = "";
            state.user = null;
        },
    },
});

export const {
    login,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
