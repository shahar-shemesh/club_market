import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface Product {
    id: number;
    name: string;
    category: number;
    amount: number;
}

interface ProductsState {
    items: Product[];
}

const initialState: ProductsState = {
    items: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<{ name: string, category: number }>) {
            const existingProduct = state.items.find(
                (product) => product.name === action.payload.name
            );
            if (existingProduct) {
                existingProduct.amount += 1;
            } else {
                state.items.push({
                    id: state.items.length + 1,
                    name: action.payload.name,
                    category: action.payload.category,
                    amount: 1
                });
            }
        },
        removeProduct(state, action: PayloadAction<number>) {
            state.items = state.items.filter(product => product.id !== action.payload);
        },
        clearProducts(state) {
            state.items = [];
        },
        updateProductAmount(state, action: PayloadAction<{ id: number; sign: '+' | '-' }>) {
            const product = state.items.find((product) => product.id === action.payload.id);
            if (product) {
                switch (action.payload.sign) {
                    case '+':
                        product.amount += 1;
                        break;
                    case '-':
                        if (product.amount > 1) {
                            product.amount -= 1;
                        } else {
                            state.items = state.items.filter((item) => item.id !== action.payload.id);
                        }
                        break;
                    default:
                        console.warn(`Unknown sign: ${action.payload.sign}`);
                }
            }
        },
    },
});

export const selectAllProducts = (state: RootState): Product[] => state.products.items;


export const { addProduct, removeProduct, clearProducts, updateProductAmount } = productSlice.actions;
export default productSlice.reducer;