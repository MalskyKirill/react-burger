import OrderBoard from './order-board/order-board';
import OrderComplited from './order-complited/order-complited';
import styles from './order-status.module.css';

const OrderStatus = () => {
  return (
    <section className={styles['order-status']}>
      <OrderBoard />
      <OrderComplited />
    </section>
  );
};

export default OrderStatus;
