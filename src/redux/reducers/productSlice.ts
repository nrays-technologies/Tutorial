import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const getProductsList = createAsyncThunk('get_products_list',
    async () => {
        try {
            const res = await fetch('https://dummyjson.com/products')
            const products = await res.json()
            return products

        } catch (error) {
            return []
        }

    }
)

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
    extraReducers(builder) {
        builder.addCase(getProductsList.pending, (state, action) => {
            state.limit = 0
            state.total = 0
            state.products = []
        })
            .addCase(getProductsList.fulfilled, (state, action) => {
                state.total = 0
                state.limit = action.payload.limit
            })
            .addCase(getProductsList.rejected, (state, action) => {
                state.limit = 0
            })
    },
})

export const { setProducts } = productSlice.actions;

export default productSlice.reducer