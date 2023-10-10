import { Token } from 'react-stripe-checkout-nsen';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { userRequest } from '../httpRequests';
import { AxiosError } from 'axios';

type PaymentError = {
    message: string;
}

interface IPaymentState {
  token: Token | null;
  error: string | null;
  stripeData: object | null;
}

const initialState: IPaymentState = {
  token: null,
  error: null,
  stripeData: null
};

interface IStripeRequest {
    token: Token;
    totalCost: number;
}

export const makeStripeRequest = createAsyncThunk<
    object, IStripeRequest, { rejectValue: PaymentError }
>(
    'payment/stripeRequest',
    async (request: IStripeRequest, { rejectWithValue }) => {
        try {
            const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
            const { token, totalCost } = request;

            const response = await userRequest.post('/payment', {
                params: { tokenId: token.id, totalCost },
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(makeStripeRequest.pending, (state) => {
        state.error = null;
    });
    builder.addCase(makeStripeRequest.fulfilled, (
        state, action: PayloadAction<any>
    ) => {
        state.stripeData = action.payload;
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
export const selectStripeData = (state: RootState) => state.payment.stripeData;

export default paymentSlice.reducer;