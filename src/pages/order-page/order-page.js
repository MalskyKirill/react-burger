import OrderBoard from '../../components/order-board/order-board';
import OrderFeed from '../../components/order-feed/ordre-feed';
import styles from './order-page.module.css';

const OrderPage = () => {
  return (
    <main className={styles.content}>
      <OrderFeed title='Лента заказов'/>
      <OrderBoard />
    </main>
  );
};

export default OrderPage;
