import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFood } from '../../models/interfaces'
import { RootState } from '../store';

interface IFoodDetailsState {
  foodDetails: IFood | null;
}

const initialState: IFoodDetailsState = {
  foodDetails: null
};

export const foodDetailsSlice = createSlice({
  name: 'foodDetails',
  initialState,
  reducers: {
    openFoodDetails: (state, action: PayloadAction<IFood>) => {
      state.foodDetails = action.payload;
    },
    closeFoodDetails: (state) => {
      state.foodDetails = null;
    }
  }
});

export const selectFoodDetails = (state: RootState) => state.foodDetails.foodDetails;

export const { openFoodDetails, closeFoodDetails } = foodDetailsSlice.actions;

export default foodDetailsSlice.reducer;