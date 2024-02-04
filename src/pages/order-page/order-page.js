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

const ORDER_FEED_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all';

const OrderPage = () => {
  const dispatch = useAppDispatch()

  const {orders, status} = useAppSelector(store => store.orderFeed);
  const isDisconnected = status !== WebsocketStatus.ONLINE;

  console.log(orders)

  useEffect(() => {
    dispatch(orderFeedConnect(ORDER_FEED_SERVER_URL))

    return () => {
      dispatch(orderFeedDisconnect())
    }
  }, [])

  return (
    <main className={styles.content}>
      <OrderFeed title='Лента заказов' />
      <OrderStatus />
    </main>
  );
};

export default OrderPage;
