import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { httpRequest } from '../../api';
import { IFetchError, IOrder } from '../../models/interfaces';

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
  IOrder, 
  IOrder, 
  { rejectValue: IFetchError, state: RootState }
>(
  'order/create',
  async (order: IOrder, { rejectWithValue, getState }) => {
    try {
      const TOKEN = getState().auth.user?.accessToken;
      const config = { headers: { token: `Bearer ${TOKEN}` } };

      const response = await httpRequest.post('/orders', order, config);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: 'Произошла ошибка во время сохранения заказа'
      });
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
      state, action: PayloadAction<IFetchError | undefined>
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