import { createReducer } from '@reduxjs/toolkit';
import { IOrder, IOrders, WebsocketStatus } from '../../types/order'
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from '../actions/socket';

export type TOrderFeedStore = {
  status: WebsocketStatus;
  orders: Array<IOrder>;
  total: number | null;
	totalToday: number | null;
  connectionError: string;
}

const initialState: TOrderFeedStore = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: null,
	totalToday: null,
  connectionError: '',
}

export const orderFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, state => {
      state.status = WebsocketStatus.ONLINE;
    })
    .addCase(wsClose, state => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    })
})
