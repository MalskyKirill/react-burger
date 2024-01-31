import OrderFeed from '../../components/order-feed/ordre-feed';
import OrderStatus from '../../components/order-status/order-status';
import styles from './order-page.module.css';

const OrderPage = () => {
  return (
    <main className={styles.content}>
      <OrderFeed title='Лента заказов'/>
      <OrderStatus />
    </main>
  );
};

export default OrderPage;
