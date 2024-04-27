import { configureStore,combineReducers } from "@reduxjs/toolkit";
import ecomSlicer from '../redux_slicer/EcomSlicer'
import productSlicer from '../redux_slicer/ProductSlicer'

const rootReducer = combineReducers({
    ecom: ecomSlicer,
    product: productSlicer
});

export const store = configureStore({
    reducer: rootReducer
});
