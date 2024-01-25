import { createSlice } from '@reduxjs/toolkit';
import { IBurgerIngredients, IIngredient } from '../../types/ingredient';

type TInitialState = {
  bun: IIngredient | null,
  ingredients: Array<IBurgerIngredients>,
}

const initialState: TInitialState = {
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
    deleteIngredient: (state, action) => {
      const filtredArrIngredient = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
      state.ingredients = filtredArrIngredient;
    },
    removeConstructorData: (state, action) => {
      return initialState;
    },
  },
});

export const { addBun, addIngredients, swapIngredients, deleteIngredient, removeConstructorData } =
  constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;

//selectors
export const selectConstructorElements = (state: { burgerConstructor: TInitialState; }) => state.burgerConstructor;
export const selectConstructorBun = (state: { burgerConstructor: { bun: IIngredient; }; }) => state.burgerConstructor.bun;
export const selectConstructorIngredients = (state: { burgerConstructor: { ingredients: Array<IBurgerIngredients>; }; }) =>
  state.burgerConstructor.ingredients;
