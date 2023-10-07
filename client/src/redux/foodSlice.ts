import { FetchError } from './../types';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../httpRequests";
import { IFood } from "../types";
import { RootState } from "./store";
import { AxiosError } from "axios";

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

export const fetchFoodByCategory = createAsyncThunk<
    IFood[], string, { rejectValue: FetchError }
> (
    'food/id/category',
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

export const fetchFoodById = createAsyncThunk<
    IFood, string, { rejectValue: FetchError }
> (
    'food/id',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await publicRequest.get(`/food/${id}`);
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

export const fetchAllFood = createAsyncThunk<
    IFood[], void, { rejectValue: FetchError }
> (
    'food/all',
    async (_: void, { rejectWithValue }) => {
        try {
            const response = await publicRequest.get('/food');
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
        // Fetch all food
        builder.addCase(fetchAllFood.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllFood.fulfilled, (
            state, action: PayloadAction<IFood[]>
        ) => {
            state.foodList = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(fetchAllFood.rejected, (
            state, action: PayloadAction<FetchError | undefined>
        ) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.message;
            }
        });

        // Fetch food by category 
        builder.addCase(fetchFoodByCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchFoodByCategory.fulfilled, (
            state, action: PayloadAction<IFood[]>
        ) => {
            state.foodList = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(fetchFoodByCategory.rejected, (
            state, action: PayloadAction<FetchError | undefined>
        ) => {
            if (action.payload) {
                state.error = action.payload.message;
            }
        });

        // Fetch food by query
        builder.addCase(fetchFoodById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchFoodById.fulfilled, (
            state, action: PayloadAction<IFood>
        ) => {
            state.foodList = [action.payload];
            state.loading = false;
            state.error = null;
        });
        builder.addCase(fetchFoodById.rejected, (
            state, action: PayloadAction<FetchError | undefined>
        ) => {
            state.loading = false;
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