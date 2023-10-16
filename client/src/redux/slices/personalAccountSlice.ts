import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../httpRequests";
import { IFetchError, IPersonalData, IUser } from "../../types";
import { RootState } from "../store";

interface IPersonalAccountState {
    user: IUser | null;
    successNotification: string | null;
    error: string | null;
    loading: boolean;
};

const initialState: IPersonalAccountState = {
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
    { rejectValue: IFetchError }
> (
    'personalAccount/updatePersonalData',
    async (request, { rejectWithValue }) => {
        try {
            const { userId, personalData } = request; 
            await publicRequest.put(`/users/${userId}`, personalData);
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
    { rejectValue: IFetchError }
> (
    'personalAccout/fetchUser',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await publicRequest.get(`/users/find/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: 'Произошла ошибка во время загрузки личных данных'
            });
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
    }
});

export const selectUser = (state: RootState) => state.personalAccount.user;
export const selectSuccessNotification = (state: RootState) => state.personalAccount.successNotification;
export const selectLoading = (state: RootState) => state.personalAccount.loading;
export const selectError = (state: RootState) => state.personalAccount.error;

export const { setError, setSuccessNotification } = personalAccountSlice.actions;

export default personalAccountSlice.reducer;