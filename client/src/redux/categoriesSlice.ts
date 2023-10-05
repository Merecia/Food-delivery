import { FetchError } from './../types';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../httpRequests";
import { ICategory } from "../types";
import { RootState } from "./store";
import { AxiosError } from "axios"

interface CategoriesState {
    chosenCategoryId: string | null;
    categories: ICategory[];
    error: string | null;
    loading: boolean;
}

const initialState: CategoriesState = {
    chosenCategoryId: null,
    categories: [],
    error: null,
    loading: false
};

export const fetchCategories = createAsyncThunk<
    ICategory[], void, { rejectValue: FetchError }
> (
    'categories/all',
    async (_: void, { rejectWithValue }) => {
        try {
            const response = await publicRequest.get(`/categories`);
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

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        chooseCategory: (state, action: PayloadAction<string>) => {
            if (state.chosenCategoryId !== action.payload) {
                state.chosenCategoryId = action.payload;
            } else {
                state.chosenCategoryId = null;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCategories.fulfilled, (
            state, action: PayloadAction<ICategory[]>
        ) => {
            state.categories = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(fetchCategories.rejected, (
            state, action: PayloadAction<FetchError | undefined>
        ) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload.message;
            }
        });
    }
});

export const { chooseCategory } = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectChosenCategoryId = (state: RootState) => state.categories.chosenCategoryId;
export const selectLoading = (state: RootState) => state.categories.loading;
export const selectError = (state: RootState) => state.categories.error;

export default categoriesSlice.reducer;