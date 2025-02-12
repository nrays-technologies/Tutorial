import { createSlice } from "@reduxjs/toolkit";
import Products from "../../screens/products";
// interface IProduct {
//     availabilityStatus: string;
//     brand: string;
//     category: string;
//     description: string;
//     discountPercentage: number;
//     id: number;
//     images: string[];
//     minimumOrderQuantity: number;
//     price: number;
//     rating: number;
//     returnPolicy: string;
//     shippingInformation: string;
//     sku: string;
//     stock: number;
//     thumbnail: string;
//     title: string;
//     warrantyInformation: string;
//     weight: number;
// }


// interface IInitialState {
//     limit: number
//     products: IProduct[],
//     total: number
// }

const initialState = {
    limit: 0,
    products: [],
    total: 0
}

const productSlice = createSlice({
    name: 'product_data',
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            console.log('==================================== action.payload');
            console.log(action.payload);
            console.log('====================================');
            state.limit = action.payload.limit
        }
    },
})

export const { setProducts } = productSlice.actions;

export default productSlice.reducer