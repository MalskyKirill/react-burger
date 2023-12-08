import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredients-slice'
import { constructorReducer } from './constructor-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer
})
