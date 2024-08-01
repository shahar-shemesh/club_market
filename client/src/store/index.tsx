import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import categoryReducer from './features/categorySlice';
import authReducer from './features/authSlice';


const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const totalProductsItems = (state: RootState): number =>
    state.products.items.reduce((total, product) => total + product.amount, 0);


export default store;
