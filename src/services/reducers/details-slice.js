import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  img: '',
  calories: null,
  carbohydrates: null,
  fat: null,
  proteins: null,
  isModalOpen: false,
};

const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    addDataDetails: (state, action) => {
      state.name = action.payload.name;
      state.img = action.payload.img;
      state.calories = action.payload.calories;
      state.carbohydrates = action.payload.carbohydrates;
      state.fat = action.payload.fat;
      state.proteins = action.payload.proteins;
      state.isModalOpen = action.payload.isModalOpen;
    },
    removeModalData: (state, action) => {
      return initialState;
    }
  },
});

export const {addDataDetails, removeModalData} = detailsSlice.actions;

export const detailsReducer = detailsSlice.reducer;

//selectors
export const selectDetailsData = (state) => state.details;
export const selectIsModalDetailsOpen = (state) => state.details.isModalOpen;
