import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem, IFood } from '../types';
import { findCartItemIndex } from '../utils/helper';
import { RootState } from './store';

interface ICartState {
    showCart: boolean;
    cart: ICartItem[];
};

const initialState: ICartState = {
    showCart: false,
    cart: []
};

export const applicationSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.showCart = true;
    },
    closeCart: (state) => {
      state.showCart = false;
    },
    addFoodToCart: (state, action: PayloadAction<IFood>) => {
      const foodItem = action.payload;
      const cartItemIndex = findCartItemIndex(foodItem, state.cart);

      if (cartItemIndex) state.cart[cartItemIndex].amount += 1;
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
        console.log('Error has occured during increase operation');
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
        console.log('Error has occured during decrease operation.');
      }
    }
  }
});

export const selectCart = (state: RootState) => state.cart.cart;
export const selectShowCart = (state: RootState) => state.cart.showCart;

export const {
  openCart, 
  closeCart, 
  emptyCart,
  addFoodToCart,
  increaseFoodAmountInCart, 
  decreaseFoodAmountInCart
} = applicationSlice.actions;

export default applicationSlice.reducer;