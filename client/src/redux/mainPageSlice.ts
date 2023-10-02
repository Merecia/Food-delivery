import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFood } from '../types';
import { RootState } from './store';

interface IMainPageState {
  foodDetails: IFood | null;
  choicedCategoryId: string | null;
}

const initialState: IMainPageState = {
  foodDetails: null,
  choicedCategoryId: null
};

export const mainPageSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openFoodDetails: (state, action: PayloadAction<IFood>) => {
      state.foodDetails = action.payload;
    },
    closeFoodDetails: (state) => {
      state.foodDetails = null;
    },
    chooseCategory: (state, action: PayloadAction<string>) => {
      state.choicedCategoryId = action.payload;
    },
  }
});

export const selectCategoryId = (state: RootState) => state.menu.choicedCategoryId;
export const selectFoodDetails = (state: RootState) => state.menu.foodDetails;

export const { openFoodDetails, closeFoodDetails, chooseCategory } = mainPageSlice.actions;

export default mainPageSlice.reducer;