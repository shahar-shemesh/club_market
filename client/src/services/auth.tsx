import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function login(username: string, password: string): Promise<{ username: string, userId: number }> {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, { username, password });
        return { username: username, userId: (response.data).userId };

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}



export async function register(username: string, password: string) {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, { username, password });
        return response.data;

    } catch (error) {
        console.error('Failed to register user:', error);
        throw error;
    }
};


export async function getUserById(userId: number) {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
}