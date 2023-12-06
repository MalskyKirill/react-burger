import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';

import { api } from '../../utils/api';

export const loadIngredients = createAsyncThunk(
  '@@ingredients/load-ingredients',
  async () => {
    const res = await api.getIngredients();
    return res;
  }
);

const initialState = {
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
        state.error = action.error.message;
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;

// selectors

const selectStatus = state => state.ingredients.status;
const selectError = state => state.ingredients.error;
const selectQty = state => state.ingredients.list.length;

export const selectIngredientsInfo = createSelector(
  selectStatus,
  selectError,
  selectQty,
  (selectStatus, selectError, selectQty) => ({
  status: selectStatus,
  error: selectError,
  qty: selectQty
}))


export const selectAllIngredients = (state) => state.ingredients.list;
