import { configureStore,combineReducers } from "@reduxjs/toolkit";
import ecomSlicer from '../redux_slicer/EcomSlicer'
import productSlicer from '../redux_slicer/ProductSlicer'
import orderSlicer from '../redux_slicer/OrderSlicer'

const rootReducer = combineReducers({
    ecom: ecomSlicer,
    product: productSlicer,
    order: orderSlicer
});

export const store = configureStore({
    reducer: rootReducer
});
