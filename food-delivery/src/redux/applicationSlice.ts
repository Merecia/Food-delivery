import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFood } from '../types';

interface ApplicationState {
    showCart: boolean;
    foodDetails: IFood | null;
}

const initialState: ApplicationState = {
  showCart: false,
  foodDetails: null
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
    }
  }
});

export const { 
  openCart, closeCart, 
  openFoodDetails, closeFoodDetails 
} = applicationSlice.actions;

export default applicationSlice.reducer;