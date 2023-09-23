import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFood } from '../types';

interface ApplicationState {
    showCart: boolean;
    foodDetails: IFood | null;
    choicedCategoryID: string | null;
}

const initialState: ApplicationState = {
  showCart: false,
  foodDetails: null,
  choicedCategoryID: null
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
    }
  }
});

export const { 
  openCart, closeCart, 
  openFoodDetails, closeFoodDetails,
  chooseCategory
} = applicationSlice.actions;

export default applicationSlice.reducer;