import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem, IFood } from '../types';
import { findCartItemIndex } from '../utils/helper';
import { RootState } from './store';

interface IApplicationState {
  showCart: boolean;
  foodDetails: IFood | null;
  choicedCategoryID: string | null;
  cart: ICartItem[];
}

const initialState: IApplicationState = {
  showCart: false,
  foodDetails: null,
  choicedCategoryID: null,
  cart: [],
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    openCart: (state) => {
      state.showCart = true;
    },
    closeCart: (state) => {
      state.showCart = false;
    },
    openFoodDetails: (state, action: PayloadAction<IFood>) => {
      state.foodDetails = action.payload;
    },
    closeFoodDetails: (state) => {
      state.foodDetails = null;
    },
    chooseCategory: (state, action: PayloadAction<string>) => {
      state.choicedCategoryID = action.payload;
    },
    addFoodToCart: (state, action: PayloadAction<IFood>) => {
      const foodItem = action.payload;
      const cartItemIndex = findCartItemIndex(foodItem, state.cart);
      if (cartItemIndex) state.cart[cartItemIndex].amount += 1;
      else state.cart.push({ foodItem, amount: 1 });
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
      console.log(cartItemIndex);
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

export const selectCart = (state: RootState) => state.application.cart;
export const selectCategoryID = (state: RootState) => state.application.choicedCategoryID;
export const selectFoodDetails = (state: RootState) => state.application.foodDetails;
export const selectShowCart = (state: RootState) => state.application.showCart;

export const {
  openCart, 
  closeCart, 
  openFoodDetails, 
  closeFoodDetails, 
  chooseCategory, 
  addFoodToCart,
  increaseFoodAmountInCart, 
  decreaseFoodAmountInCart
} = applicationSlice.actions;

export default applicationSlice.reducer;