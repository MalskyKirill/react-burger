// import styles from './profile-orders.module.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { ACCESS_TOKEN } from '../../utils/consts';
import OrderFeed from '../order-feed/ordre-feed';
import {
  connect as orderFeedProfileConnect,
  disconnect as orderFeedProfileDisconnect,
} from '../../services/actions/socket-profile';
import { WebsocketStatus } from '../../types/order';
import Preloader from '../preloader/preloader';

const ORDER_FEED_PROFILE_SERVER_URL = 'wss://norma.nomoreparties.space/orders';

const ProfileOrders = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const orders = useAppSelector((store) => store.orderFeedProfile.orders);
  const status = useAppSelector((store) => store.orderFeedProfile.status);

  const reversOrders = [...orders].reverse()

  const token = localStorage.getItem(ACCESS_TOKEN)?.replace('Bearer ', '')

  useEffect(() => {
    dispatch(orderFeedProfileConnect(`${ORDER_FEED_PROFILE_SERVER_URL}?token=${token}`));

    return () => {
      dispatch(orderFeedProfileDisconnect());
    };
  }, []);


  return(
    <>
    {status === WebsocketStatus.CONNECTING && <Preloader />}
    {orders && <OrderFeed orders={reversOrders}/>}
    </>
  );
}

export default ProfileOrders;
