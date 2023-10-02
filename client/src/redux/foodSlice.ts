import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../httpRequests";
import { IFood } from "../types";
import { RootState } from "./store";
import { AxiosError } from "axios";

type FoodError = {
    message: string;
}

interface FoodState {
    foodList: IFood[];
    error: string | null;
    loading: boolean;
}

const initialState: FoodState = {
    foodList: [],
    error: null,
    loading: false
};

export const fetchFoodList = createAsyncThunk<
    IFood[],
    string,
    { rejectValue: FoodError }
> (
    'food/fetch',
    async (categoryId: string, { rejectWithValue }) => {
        try {
            const response = await publicRequest.get(`/food/${categoryId}/category`);
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

export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFoodList.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchFoodList.fulfilled, (
            state, action: PayloadAction<IFood[]>
        ) => {
            state.foodList = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(fetchFoodList.rejected, (
            state, action: PayloadAction<FoodError | undefined>
        ) => {
            if (action.payload) {
                state.error = action.payload.message;
            }
        });
    }
});

export const selectFoodList = (state: RootState) => state.food.foodList;
export const selectLoading = (state: RootState) => state.food.loading;
export const selectError = (state: RootState) => state.food.error;

export default foodSlice.reducer;