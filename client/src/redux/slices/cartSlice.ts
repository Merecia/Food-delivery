import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem, IFood } from '../../models/interfaces';
import { RootState } from '../store';
import { findCartItemIndex } from '../../utils/cart';

interface ICartState {
  showCart: boolean;
  cart: ICartItem[];
  error: string | null;
};

const initialState: ICartState = {
  showCart: false,
  cart: [],
  error: null
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.showCart = true;
    },
    closeCart: (state) => {
      state.showCart = false;
    },
    resetToInitial: (state) => {
      state.showCart = false;
      state.cart = [];
    },
    addFoodToCart: (state, action: PayloadAction<IFood>) => {
      const foodItem = action.payload;
      const cartItemIndex = findCartItemIndex(foodItem, state.cart);

      if (cartItemIndex !== undefined) state.cart[cartItemIndex].amount += 1;
      else state.cart.push({ foodItem, amount: 1 });
    },
    emptyCart: (state) => {
      state.cart = [];
    },
    increaseFoodAmountInCart: (state, action: PayloadAction<IFood>) => {
      const foodItem = action.payload;
      const cartItemIndex = findCartItemIndex(foodItem, state.cart);

      if (cartItemIndex !== undefined) {
        state.cart[cartItemIndex].amount += 1;
      } else {
        state.error = 'Произошла ошибка';
      }
    },
    decreaseFoodAmountInCart: (state, action: PayloadAction<IFood>) => {
      const foodItem = action.payload;
      const cartItemIndex = findCartItemIndex(foodItem, state.cart);

      if (cartItemIndex !== undefined) {
        if (state.cart[cartItemIndex].amount === 1) {
          state.cart.splice(cartItemIndex, 1);
        } else {
          state.cart[cartItemIndex].amount -= 1;
        }
      } else {
        state.error = 'Произошла ошибка';
      }
    }
  }
});

export const selectCart = (state: RootState) => state.cart.cart;
export const selectShowCart = (state: RootState) => state.cart.showCart;
export const selectError = (state: RootState) => state.cart.error;

export const {
  openCart,
  closeCart,
  emptyCart,
  resetToInitial,
  addFoodToCart,
  increaseFoodAmountInCart,
  decreaseFoodAmountInCart
} = cartSlice.actions;

export default cartSlice.reducer;