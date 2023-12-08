import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: '@@constructor',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredients: (state, action) => {
      state.ingredients.push(action.payload);
    },
    swapIngredients: (state, action) => {
      const swapIngredients = [...state.ingredients];
      swapIngredients.splice(
        action.payload.toIndex,
        0,
        swapIngredients.splice(action.payload.fromIndex, 1)[0]
      );

      state.ingredients = swapIngredients;
    },
  },
});

export const { addBun, addIngredients, swapIngredients } =
  constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;

//selectors
export const selectConstructorElements = (state) => state.burgerConstructor;
export const selectConstructorBun = (state) => state.burgerConstructor.bun;
export const selectConstructorIngredients = (state) =>
  state.burgerConstructor.ingredients;
