import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productSlice from './reducers/productSlice';

const rootReducers = combineReducers({
    productOptions: productSlice,
})

const store = configureStore({
    reducer: rootReducers
})

export default store;