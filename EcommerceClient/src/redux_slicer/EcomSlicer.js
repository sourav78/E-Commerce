import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: {}
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
        }
    }
});

export const { updateIsAuthenticated, updateUser } = ecomSlice.actions;

export default ecomSlice.reducer;
