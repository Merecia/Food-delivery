import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../httpRequests";
import { IFetchError, IPersonalData } from "../../types";
import { RootState } from "../store";

interface IPersonalAccountState {
    successNotification: string | null;
    error: string | null;
    loading: boolean;
};

const initialState: IPersonalAccountState = {
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
    }
});

export const selectSuccessNotification = (state: RootState) => state.personalAccount.successNotification;
export const selectLoading = (state: RootState) => state.personalAccount.loading;
export const selectError = (state: RootState) => state.personalAccount.error;

export const { setError, setSuccessNotification } = personalAccountSlice.actions;

export default personalAccountSlice.reducer;