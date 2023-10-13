import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { userRequest } from '../httpRequests';
import { AxiosError } from 'axios';
import { FetchError, IOrder } from '../types';

interface IOrderState {
  order: IOrder | null;
  error: string | null;
  loading: boolean;
}

const initialState: IOrderState = {
  order: null,
  error: null,
  loading: false
};

export const createOrder = createAsyncThunk<
  IOrder, IOrder, { rejectValue: FetchError }
> (
  'order/create',
  async (order: IOrder, { rejectWithValue }) => {
    try {
      const response = await userRequest.post('/orders', order);
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

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetToInitial: (state) => {
      state.error = null;
      state.order = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (
      state, action: PayloadAction<IOrder>
    ) => {
      state.order = action.payload;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(createOrder.rejected, (
      state, action: PayloadAction<FetchError | undefined>
    ) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        }
    });
  }
});

export const selectOrder = (state: RootState) => state.order.order;
export const selectLoading = (state: RootState) => state.order.loading;
export const selectError = (state: RootState) => state.order.error;

export const { setError, resetToInitial } = orderSlice.actions;

export default orderSlice.reducer;