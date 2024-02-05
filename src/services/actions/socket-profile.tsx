import { createAction } from '@reduxjs/toolkit';
import { IOrders } from '../../types/order';

export const connect = createAction<string, 'ORDER_FEED_CONNECT_PROFILE'>(
  'ORDER_FEED_CONNECT_PROFILE'
);
export const disconnect = createAction('ORDER_FEED_DISCONNECT_PROFILE');

export const wsConnecting = createAction('ORDER_FEED_WS_CONNECTING_PROFILE');
export const wsOpen = createAction('ORDER_FEED_WS_OPEN_PROFILE');
export const wsClose = createAction('ORDER_FEED_WS_CLOSE_PROFILE');
export const wsError = createAction<string, 'ORDER_FEED_WS_ERROR_PROFILE'>(
  'ORDER_FEED_WS_ERROR_PROFILE'
);
export const wsMessage = createAction<IOrders, 'ORDER_FEED_WS_MESSAGE_PROFILE'>(
  'ORDER_FEED_WS_MESSAGE_PROFILE'
);

export type TOrderFeedActionsProfile =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsError>
  | ReturnType<typeof wsMessage>;
