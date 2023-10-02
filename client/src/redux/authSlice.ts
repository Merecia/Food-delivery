import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../httpRequests";
import { ILoginData, IRegistrationData, IUser } from "../types";
import { RootState } from "./store";
import { AxiosError } from "axios";
import { isRegistrationData } from "../utils/helper";

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

export const auth = createAsyncThunk<
    IUser,
    IRegistrationData | ILoginData,
    { rejectValue: AuthError }
> (
    'auth',
    async (authData: IRegistrationData | ILoginData, { rejectWithValue }) => {
        try {
            const response = isRegistrationData(authData)
                ? await publicRequest.post('/auth/register', authData)
                : await publicRequest.post('/auth/login', authData);

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
        builder.addCase(auth.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(auth.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(auth.rejected, (
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