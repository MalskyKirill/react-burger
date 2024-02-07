import OrderFeed from '../../components/order-feed/ordre-feed';
import OrderStatus from '../../components/order-status/order-status';
import styles from './order-page.module.css';

import {
  connect as orderFeedConnect,
  disconnect as orderFeedDisconnect,
} from '../../services/actions/socket';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { WebsocketStatus } from '../../types/order';
import { useEffect } from 'react';
import Preloader from '../../components/preloader/preloader';

const ORDER_FEED_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all';

const OrderPage = () => {
  const dispatch = useAppDispatch();

  const { status, orders } = useAppSelector((store) => store.orderFeed);

  useEffect(() => {
    dispatch(orderFeedConnect(ORDER_FEED_SERVER_URL));

    return () => {
      dispatch(orderFeedDisconnect());
    };
  }, []);

  return (
    <>
      {status === WebsocketStatus.CONNECTING && <Preloader />}
      {status === WebsocketStatus.ONLINE && (
        <main className={styles.content}>
          <OrderFeed title='Лента заказов' orders={orders} />
          <OrderStatus />
        </main>
      )}
    </>
  );
};

export default OrderPage;
