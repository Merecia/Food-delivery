import { FetchError, IAutocompleteOption } from './../types';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../httpRequests";
import { IFood } from "../types";
import { RootState } from "./store";
import { AxiosError } from "axios";

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
    IFood[], string, { rejectValue: FetchError }
>(
    'search/query',
    async (query: string, { rejectWithValue }) => {
        try {
            const response = await publicRequest.get(`/food/?query=${query}`);

            console.log(response.data);

            const autocompleteOptions = response.data.map((foodItem: IFood) => {
                return {
                    _id: foodItem._id,
                    name: foodItem.name
                };
            });

            console.log(autocompleteOptions);

            return autocompleteOptions;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue({ message: error.response.data.message });
            } else {
                return rejectWithValue({ message: 'Unexcepted error' });
            }
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
        showAutocompleteOptions: (state) => {
            state.autocompleteVisible = true;
        },
        hideAutocompleteOptions: (state) => {
            state.autocompleteVisible = false;
        }
    },
    extraReducers: (builder) => {
        // Get autocomplete options
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
            state, action: PayloadAction<FetchError | undefined>
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

export const { 
    setQuery, 
    showAutocompleteOptions, 
    hideAutocompleteOptions 
} = searchSlice.actions;

export default searchSlice.reducer;