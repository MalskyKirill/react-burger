import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket-middleware';
import { rootReducer } from './reducers/index';
import {
  connect as orderFeedConnect,
  disconnect as orderFeedDisconnect,
  wsOpen as orderFeedWsOpen,
  wsClose as orderFeedWsClose,
  wsMessage as orderFeedWsMessage,
  wsError as orderFeedWsError,
  wsConnecting as orderFeedWsConnecting,
} from './actions/socket';

const orderFeedMiddleware = socketMiddleware({
  wsConnect: orderFeedConnect,
  wsDisconnect: orderFeedDisconnect,
  wsConnecting: orderFeedWsConnecting,
  onOpen: orderFeedWsOpen,
  onClose: orderFeedWsClose,
  onError: orderFeedWsError,
  onMessage: orderFeedWsMessage,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(orderFeedMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
