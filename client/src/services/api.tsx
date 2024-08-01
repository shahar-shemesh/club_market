import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function createShoppingList(user_id: number, products: Array<{ name: string, category_id: number, amount: number }>) {
    try {
        const response = await axios.post(`${API_BASE_URL}/list`, {
            user_id,
            products
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create shopping list:', error);
        throw error;
    }
}

// קבלת כל המוצרים עבור רשימת קניות לפי shoppingList_id
export async function getProductsByShoppingListId(shoppingListId: number) {
    try {
        const response = await axios.get(`${API_BASE_URL}/list/${shoppingListId}/products`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
}

// קבלת כל רשימות הקניות
export async function getAllShoppingLists() {
    try {
        const response = await axios.get(`${API_BASE_URL}/list`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch shopping lists:', error);
        throw error;
    }
};



// קבלת רשימת קניות לפי ID
export async function getShoppingListById(shoppingListId: number) {
    try {
        const response = await axios.get(`${API_BASE_URL}/list/${shoppingListId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch shopping list:', error);
        throw error;
    }
};