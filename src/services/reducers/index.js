import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredients-slice'
import { constructorReducer } from './constructor-slice';
import { detailsReducer } from './details-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  details: detailsReducer
})
