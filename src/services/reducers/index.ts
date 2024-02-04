import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredients-slice'
import { constructorReducer } from './constructor-slice';
import { detailsReducer } from './details-slice';
import { orderReducer } from './order-slice';
import { authReducer } from './auth-slice';
import {orderFeedReducer} from './soket-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  details: detailsReducer,
  order: orderReducer,
  auth: authReducer,
  orderFeed: orderFeedReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
