import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '../reducers';

export type TWsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (
  wsActions: TWsActionTypes
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      wsConnect,
      wsDisconnect,
      wsSendMessage,
      wsConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;

      if(wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());

        socket.onopen = () => {
          dispatch(onOpen());
        }

        socket.onerror = () => {
          dispatch(onError('ERROR'));
        }

        socket.onclose = () => {
          dispatch(onClose())
        }

        socket.onmessage = (evt) => {
          const { data } = evt;
          const parseData = JSON.parse(data);

          dispatch(onMessage(parseData));
        }
      }

      if(socket && wsSendMessage?.match(action)) {
        socket.send(JSON.stringify(action.payload))
      }

      if(socket && wsDisconnect?.match(action)) {
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
