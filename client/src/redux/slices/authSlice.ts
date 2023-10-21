import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "../../api";
import { RootState } from "../store";
import {
    ILoginData,
    IRegistrationData,
    IFetchError,
    IUser
} from "../../models/interfaces";
import { AxiosError } from "axios";

interface IAuthState {
    user: IUser | null;
    error: string | null;
    loading: boolean;
};

const initialState: IAuthState = {
    user: null,
    error: null,
    loading: false,
};

export const registration = createAsyncThunk<
    IUser,
    IRegistrationData,
    { rejectValue: IFetchError }
>(
    'auth/register',
    async (registrationData: IRegistrationData, { rejectWithValue }) => {
        try {
            const response = await httpRequest.post('/auth/register', registrationData);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue({
                    message: error.response.data.message
                });
            } else {
                return rejectWithValue({
                    message: 'Произошла неизвестная ошибка во время регистрации'
                });
            }
        }
    }
);

export const login = createAsyncThunk<
    IUser,
    ILoginData,
    { rejectValue: IFetchError }
>(
    'auth/login',
    async (loginData: ILoginData, { rejectWithValue }) => {
        try {
            const response = await httpRequest.post('/auth/login', loginData);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue({
                    message: error.response.data.message
                });
            } else {
                return rejectWithValue({
                    message: 'Произошла неизвестная ошибка во время авторизации'
                });
            }
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        signOut: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registration.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registration.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(registration.rejected, (
            state, action: PayloadAction<IFetchError | undefined>
        ) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.message;
            }
        });

        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(login.rejected, (
            state, action: PayloadAction<IFetchError | undefined>
        ) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.message;
            }
        });
    }
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;

export const { setError, signOut } = authSlice.actions;

export default authSlice.reducer;