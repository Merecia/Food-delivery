import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "../../api";
import { IFetchError, IOrder, IPersonalData, IUser } from '../../models/interfaces'
import { RootState } from "../store";

interface IPersonalAccountState {
    orders: IOrder[];
    user: IUser | null;
    successNotification: string | null;
    error: string | null;
    loading: boolean;
};

const initialState: IPersonalAccountState = {
    orders: [],
    user: null,
    successNotification: null,
    error: null,
    loading: false,
};

interface IUpdatePersonalDataRequest {
    userId: string;
    personalData: IPersonalData;
}

export const updatePersonalData = createAsyncThunk<
    string,
    IUpdatePersonalDataRequest,
    { rejectValue: IFetchError, state: RootState }
>(
    'personalAccount/updatePersonalData',
    async (request, { rejectWithValue, getState }) => {
        try {
            const { userId, personalData } = request;

            const TOKEN = getState().auth.user?.accessToken;
            const config = { headers: { token: `Bearer ${TOKEN}` } };

            await httpRequest.put(`/users/${userId}`, personalData, config);
            return 'Ваши данные успешно изменены';
        } catch (error) {
            return rejectWithValue({
                message: 'Произошла ошибка во время обновления данных'
            });
        }
    }
)

export const fetchUserData = createAsyncThunk<
    IUser,
    string,
    { rejectValue: IFetchError, state: RootState }
>(
    'personalAccout/fetchUser',
    async (id: string, { rejectWithValue, getState }) => {
        try {
            const TOKEN = getState().auth.user?.accessToken;
            const config = { headers: { token: `Bearer ${TOKEN}` } };

            const response = await httpRequest.get(`/users/${id}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: 'Произошла ошибка во время загрузки личных данных'
            });
        }
    }
)

export const fetchOrders = createAsyncThunk<
    IOrder[],
    string,
    { rejectValue: IFetchError, state: RootState }
>(
    'personalAccount/fetchOrders',
    async (id: string, { rejectWithValue, getState }) => {
        try {
            const TOKEN = getState().auth.user?.accessToken;
            const config = { headers: { token: `Bearer ${TOKEN}` } };

            const response = await httpRequest.get(`/orders/${id}/user`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: 'Произошла ошибка во время загрузки заказов'
            })
        }
    }
)

export const personalAccountSlice = createSlice({
    name: 'personalAccount',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setSuccessNotification: (state, action: PayloadAction<string | null>) => {
            state.successNotification = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updatePersonalData.pending, (state) => {
            state.successNotification = null;
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updatePersonalData.fulfilled, (
            state, action: PayloadAction<string>
        ) => {
            state.successNotification = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(updatePersonalData.rejected, (
            state, action: PayloadAction<IFetchError | undefined>
        ) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.message;
            }
        });

        builder.addCase(fetchUserData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUserData.fulfilled, (
            state, action: PayloadAction<IUser>
        ) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(fetchUserData.rejected, (
            state, action: PayloadAction<IFetchError | undefined>
        ) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.message;
            }
        });

        builder.addCase(fetchOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchOrders.fulfilled, (
            state, action: PayloadAction<IOrder[]>
        ) => {
            state.orders = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(fetchOrders.rejected, (
            state, action: PayloadAction<IFetchError | undefined>
        ) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.message;
            }
        });
    }
});

export const selectUser = (state: RootState) => state.personalAccount.user;
export const selectOrders = (state: RootState) => state.personalAccount.orders;
export const selectSuccessNotification = (state: RootState) => state.personalAccount.successNotification;
export const selectLoading = (state: RootState) => state.personalAccount.loading;
export const selectError = (state: RootState) => state.personalAccount.error;

export const { setError, setSuccessNotification } = personalAccountSlice.actions;

export default personalAccountSlice.reducer;