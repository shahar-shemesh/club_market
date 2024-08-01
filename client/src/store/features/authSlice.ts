import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    userId: number | null;
    username: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    userId: null,
    username: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ username: string, userId: number }>) {
            state.isAuthenticated = true;
            state.userId = action.payload.userId;
            state.username = action.payload.username;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.userId = null;
            state.username = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
