import { Token } from 'react-stripe-checkout-nsen';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { userRequest } from '../httpRequests';
import { AxiosError } from 'axios';
import { IPaymentData } from '../types';

type PaymentError = {
    message: string;
}

interface IPaymentState {
  token: Token | null;
  error: string | null;
  paymentData: IPaymentData | null;
}

const initialState: IPaymentState = {
  token: null,
  error: null,
  paymentData: null
};

interface IStripeRequest {
    token: Token;
    totalCost: number;
}

export const makeStripeRequest = createAsyncThunk<
    IPaymentData, IStripeRequest, { rejectValue: PaymentError }
> (
    'payment/stripeRequest',
    async (request: IStripeRequest, { rejectWithValue }) => {
        try {
            const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
            const { token, totalCost } = request;

            const response = await userRequest.post('/payment', {
                params: { tokenId: token.id, totalCost: totalCost },
                headers: { Authorization: `Bearer ${PUBLISHABLE_KEY}` }
            });

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
        state, action: PayloadAction<PaymentError | undefined>
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

export const {
    resetToInitial
  } = paymentSlice.actions;

export default paymentSlice.reducer;