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
import {
  connect as orderFeedConnectProfile,
  disconnect as orderFeedDisconnectProfile,
  wsOpen as orderFeedWsOpenProfile,
  wsClose as orderFeedWsCloseProfile,
  wsMessage as orderFeedWsMessageProfile,
  wsError as orderFeedWsErrorProfile,
  wsConnecting as orderFeedWsConnectingProfile,
} from './actions/socket-profile';

const orderFeedMiddleware = socketMiddleware({
  wsConnect: orderFeedConnect,
  wsDisconnect: orderFeedDisconnect,
  wsConnecting: orderFeedWsConnecting,
  onOpen: orderFeedWsOpen,
  onClose: orderFeedWsClose,
  onError: orderFeedWsError,
  onMessage: orderFeedWsMessage,
}, false);

const orderFeedProfileMiddleware = socketMiddleware({
  wsConnect: orderFeedConnectProfile,
  wsDisconnect: orderFeedDisconnectProfile,
  wsConnecting: orderFeedWsConnectingProfile,
  onOpen: orderFeedWsOpenProfile,
  onClose: orderFeedWsCloseProfile,
  onError: orderFeedWsErrorProfile,
  onMessage: orderFeedWsMessageProfile,
}, true);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(orderFeedMiddleware).concat(orderFeedProfileMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
