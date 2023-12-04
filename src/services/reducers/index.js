import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredients-slice'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer
})
