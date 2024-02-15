import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredients-slice/ingredients-slice'
import { constructorReducer } from './constructor-slice/constructor-slice';
import { detailsReducer } from './details-slice/details-slice';
import { orderReducer } from './order-slice';
import { authReducer } from './auth-slice';
import {orderFeedReducer} from './soket-reducer';
import { orderFeedProfileReducer } from './soket-reducer-profile';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  details: detailsReducer,
  order: orderReducer,
  auth: authReducer,
  orderFeed: orderFeedReducer,
  orderFeedProfile: orderFeedProfileReducer
})

export type RootState = ReturnType<typeof rootReducer>;
