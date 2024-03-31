import { configureStore } from "@reduxjs/toolkit";
import ecomSlicer from '../redux_slicer/EcomSlicer'

export const store = configureStore({
    reducer: ecomSlicer
})