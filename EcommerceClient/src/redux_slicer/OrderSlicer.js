import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    totalAmount: 0,
    address: {},
    coupons: [],
    userDetails: {}
}

export const orderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        updateProducts: (state, action) => {
            state.products = action.payload;
        },
        updateTotalAmount: (state, action) => {
            state.totalAmount = action.payload;
        },
        updateAddress: (state, action) => {
            state.address = action.payload;
        },
        updateCoupons: (state, action) => {
            if(action.payload !== ""){
                if(!state.coupons.includes(action.payload)){
                    state.coupons.push(action.payload)
                }
            }else{
                state.coupons = []
            }
        },
        updateUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
    }
})

export const { updateProducts, updateTotalAmount, updateAddress, updateCoupons, updateUserDetails} = orderSlice.actions;

export default orderSlice.reducer