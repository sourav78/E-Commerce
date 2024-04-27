import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: 'all',
    price:{
        low: 0,
        high: 100000
    },
    ratting: null,
    dataOrder: 'rec'
};

export const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        updateCategory: (state, action) => {
            state.category = action.payload;
        },
        updatePrice: (state, action) => {
            state.price = action.payload;
        },
        updateRatting: (state, action) => {
            state.ratting = action.payload;
        },
        updateDataOrder: (state, action) => {
            state.dataOrder = action.payload
        }
    }
});

export const { updateCategory, updatePrice, updateRatting, updateDataOrder } = productSlice.actions;

export default productSlice.reducer;