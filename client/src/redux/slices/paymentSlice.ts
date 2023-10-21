import { Token } from 'react-stripe-checkout-nsen';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { httpRequest } from '../../api';
import { IPaymentData, IFetchError } from '../../models/interfaces';

interface IPaymentState {
  token: Token | null;
  error: string | null;
  paymentData: IPaymentData | null;
}

const initialState: IPaymentState = {
  token: null,
  error: null,
  paymentData: null
}

interface IStripeRequest {
    token: Token;
    totalCost: number;
}

export const makeStripeRequest = createAsyncThunk<
    IPaymentData, IStripeRequest, { rejectValue: IFetchError }
> (
    'payment/stripeRequest',
    async (request: IStripeRequest, { rejectWithValue }) => {
        try {
            const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
            const { token, totalCost } = request;

            const response = await httpRequest.post('/payment', {
                params: { tokenId: token.id, totalCost: totalCost },
                headers: { Authorization: `Bearer ${PUBLISHABLE_KEY}` }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue({ 
                message: 'Произошла ошибка во время оплаты' 
            });
        }
    }
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetToInitial: (state) => {
        state.token = null;
        state.error = null;
        state.paymentData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(makeStripeRequest.pending, (state) => {
        state.error = null;
    });
    builder.addCase(makeStripeRequest.fulfilled, (
        state, action: PayloadAction<IPaymentData>
    ) => {
        state.paymentData = action.payload;
        state.error = null;
    });
    builder.addCase(makeStripeRequest.rejected, (
        state, action: PayloadAction<IFetchError | undefined>
    ) => {
        if (action.payload) {
            state.error = action.payload.message;
        }
    });
  }
});

export const selectToken = (state: RootState) => state.payment.token;
export const selectError = (state: RootState) => state.payment.error;
export const selectPaymentData = (state: RootState) => state.payment.paymentData;

export const { resetToInitial } = paymentSlice.actions;

export default paymentSlice.reducer;