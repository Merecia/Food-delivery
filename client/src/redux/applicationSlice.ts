import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFood } from '../types';
import { RootState } from './store';

interface IApplicationState {
  foodDetails: IFood | null;
  choicedCategoryID: string | null;
}

const initialState: IApplicationState = {
  foodDetails: null,
  choicedCategoryID: null
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    openFoodDetails: (state, action: PayloadAction<IFood>) => {
      state.foodDetails = action.payload;
    },
    closeFoodDetails: (state) => {
      state.foodDetails = null;
    },
    chooseCategory: (state, action: PayloadAction<string>) => {
      state.choicedCategoryID = action.payload;
    },
  }
});

export const selectCategoryID = (state: RootState) => state.application.choicedCategoryID;
export const selectFoodDetails = (state: RootState) => state.application.foodDetails;

export const { 
  openFoodDetails, 
  closeFoodDetails, 
  chooseCategory
} = applicationSlice.actions;

export default applicationSlice.reducer;