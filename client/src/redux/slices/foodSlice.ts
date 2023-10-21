import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "../../api";
import { IFood, IFetchError } from "../../models/interfaces";
import { RootState } from "../store";

interface IFoodState {
    foodList: IFood[];
    error: string | null;
    loading: boolean;
}

const initialState: IFoodState = {
    foodList: [],
    error: null,
    loading: false
};

export const fetchFoodByCategory = createAsyncThunk<
    IFood[], string, { rejectValue: IFetchError }
>(
    'food/id/category',
    async (categoryId: string, { rejectWithValue }) => {
        try {
            const response = await httpRequest.get(`/food/${categoryId}/category`);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: 'Произошла ошибка во время загрузки данных с сервера'
            });
        }
    }
);

export const fetchFoodById = createAsyncThunk<
    IFood, string, { rejectValue: IFetchError }
>(
    'food/id',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await httpRequest.get(`/food/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: 'Произошла ошибка во время загрузки данных с сервера'
            });
        }
    }
);

export const fetchAllFood = createAsyncThunk<
    IFood[], void, { rejectValue: IFetchError }
>(
    'food/all',
    async (_: void, { rejectWithValue }) => {
        try {
            const response = await httpRequest.get('/food');
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: 'Произошла ошибка во время загрузки данных с сервера'
            });
        }
    }
);

export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
            state, action: PayloadAction<IFetchError | undefined>
        ) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.message;
            }
        });

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
            state, action: PayloadAction<IFetchError | undefined>
        ) => {
            if (action.payload) {
                state.error = action.payload.message;
            }
        });

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
            state, action: PayloadAction<IFetchError | undefined>
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