import OrderBoard from './order-board/order-board';
import OrderCompleted from './order-completed/order-completed';
import styles from './order-status.module.css';

const OrderStatus = () => {
  return (
    <section className={styles['order-status']}>
      <OrderBoard />
      <OrderCompleted />
    </section>
  );
};

export default OrderStatus;
