import { IAutocompleteOption, IFetchError, IFood } from '../../models/interfaces';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "../../api";
import { RootState } from "../store";

interface ISearchState {
    query: string;
    autocompleteOptions: IAutocompleteOption[];
    autocompleteVisible: boolean;
    error: string | null;
}

const initialState: ISearchState = {
    query: '',
    autocompleteOptions: [],
    autocompleteVisible: false,
    error: null
};

export const getAutocompleteOptions = createAsyncThunk<
    IFood[], string, { rejectValue: IFetchError }
>(
    'search/query',
    async (query: string, { rejectWithValue }) => {
        try {
            const response = await httpRequest.get(`/food/?query=${query}`);

            const autocompleteOptions = response.data.map((foodItem: IFood) => {
                return { _id: foodItem._id, name: foodItem.name };
            });

            return autocompleteOptions;
        } catch (error) {
            return rejectWithValue({
                message: 'Произошла ошибка во время поиска'
            });
        }
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        hideAutocompleteOptions: (state) => {
            state.autocompleteVisible = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAutocompleteOptions.pending, (state) => {
            state.autocompleteVisible = false;
            state.error = null;
        });
        builder.addCase(getAutocompleteOptions.fulfilled, (
            state, action: PayloadAction<IAutocompleteOption[]>
        ) => {
            state.autocompleteOptions = action.payload;
            state.autocompleteVisible = true;
            state.error = null;
        });
        builder.addCase(getAutocompleteOptions.rejected, (
            state, action: PayloadAction<IFetchError | undefined>
        ) => {
            state.autocompleteVisible = false;
            if (action.payload) {
                state.error = action.payload.message;
            }
        });
    }
});

export const selectQuery = (state: RootState) => state.search.query;
export const selectAutocompeteOptions = (state: RootState) => state.search.autocompleteOptions;
export const selectAutocompeteVisible = (state: RootState) => state.search.autocompleteVisible;
export const selectError = (state: RootState) => state.search.error;

export const { setQuery, hideAutocompleteOptions } = searchSlice.actions;

export default searchSlice.reducer;