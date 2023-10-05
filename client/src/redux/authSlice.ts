import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../httpRequests";
import { ILoginData, IRegistrationData, IUser } from "../types";
import { RootState } from "./store";
import { AxiosError } from "axios";

type AuthError = {
    message: string;
}

interface AuthState {
    user: IUser | null;
    error: string | null;
    loading: boolean;
};

const initialState: AuthState = {
    user: null,
    error: null,
    loading: false,
};

export const registration = createAsyncThunk<
    IUser,
    IRegistrationData,
    { rejectValue: AuthError }
> (
    'auth/register',
    async (registrationData: IRegistrationData, { rejectWithValue }) => {
        try {
            const response = await publicRequest.post('/auth/register', registrationData);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue({ message: error.response.data.message });
            } else {
                return rejectWithValue({ message: 'Unexcepted error' });
            }
        }
    }
);

export const login = createAsyncThunk<
    IUser,
    ILoginData,
    { rejectValue: AuthError }
> (
    'auth/login',
    async (loginData: ILoginData, { rejectWithValue }) => {
        try {
            const response = await publicRequest.post('/auth/login', loginData);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue({ message: error.response.data.message });
            } else {
                return rejectWithValue({ message: 'Unexcepted error' });
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
        }
    },
    extraReducers: (builder) => {
        // Registration
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
            state, action: PayloadAction<AuthError | undefined>
        ) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.message;
            }
        });

        // Login
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
            state, action: PayloadAction<AuthError | undefined>
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

export const { setError } = authSlice.actions;

export default authSlice.reducer;