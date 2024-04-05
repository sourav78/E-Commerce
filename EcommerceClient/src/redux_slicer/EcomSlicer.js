import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: {},
    trigger: true
};

export const ecomSlice = createSlice({
    name: 'Ecom',
    initialState,
    reducers: {
        updateIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        toggleTrigger: (state) => {
            state.trigger = !state.trigger;
        }
    }
});

export const { updateIsAuthenticated, updateUser, toggleTrigger } = ecomSlice.actions;

export default ecomSlice.reducer;
