// import styles from './profile-orders.module.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { ACCESS_TOKEN } from '../../utils/consts';
import OrderFeed from '../order-feed/ordre-feed';
import {
  connect as orderFeedProfileConnect,
  disconnect as orderFeedProfileDisconnect,
} from '../../services/actions/socket-profile';

const ORDER_FEED_PROFILE_SERVER_URL = 'wss://norma.nomoreparties.space/orders';

const ProfileOrders = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const { status, orders } = useAppSelector((store) => store.orderFeedProfile);

  const token = localStorage.getItem(ACCESS_TOKEN)?.replace('Bearer ', '')

  useEffect(() => {
    dispatch(orderFeedProfileConnect(`${ORDER_FEED_PROFILE_SERVER_URL}?token=${token}`));

    return () => {
      dispatch(orderFeedProfileDisconnect());
    };
  }, []);


  return(
    <OrderFeed orders={orders}/>
  );
}

export default ProfileOrders;
