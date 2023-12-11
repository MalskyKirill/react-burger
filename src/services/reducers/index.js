import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredients-slice'
import { constructorReducer } from './constructor-slice';
import { detailsReducer } from './details-slice';
import { orderReducer } from './order-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  details: detailsReducer,
  order: orderReducer
})
