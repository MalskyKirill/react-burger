import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { IIngredient } from '../../types/ingredient';

import { api } from '../../utils/api';

export const loadIngredients = createAsyncThunk(
  '@@ingredients/load-ingredients',
  async () => {
    const res = await api.getIngredients();
    return res;
  }
);

type TInitialState = {
  list: Array<IIngredient>,
  status: string,
  error: string | null,
}

const initialState: TInitialState = {
  list: [],
  status: 'idle',
  error: null,
};

const ingredientsSlice = createSlice({
  name: '@@ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.status = 'rejected';
        if(action.error.message) state.error = action.error.message;
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;

// selectors

const selectStatus = (state: { ingredients: { status: string }; }) => state.ingredients.status;
const selectError = (state: { ingredients: { error: string | null; }; }) => state.ingredients.error;

export const selectIngredientsInfo = createSelector(
  selectStatus,
  selectError,
  (selectStatus, selectError) => ({
  status: selectStatus,
  error: selectError,
}))


export const selectAllIngredients = (state: { ingredients: { list: Array<IIngredient>; }; }) => state.ingredients.list;
