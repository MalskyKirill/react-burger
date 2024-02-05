import styles from './order-complited.module.css';
import { useAppSelector } from '../../../services/hooks';

const OrderComplited = () => {
  const {total, totalToday} = useAppSelector(store => store.orderFeed)

  return (
    <>
      <div className={styles['board-complited-all']}>
        <h3 className={`${styles['board-title']} text text_type_main-medium`}>Выполнено за все время:</h3>
        <span className={`${styles['orders-all']} text text_type_digits-large`}>{total}</span>
      </div>
      <div className={styles['board-complited-today']}>
        <h3 className={`${styles['board-title']} text text_type_main-medium`}>Выполнено за сегодня:</h3>
        <span className={`${styles['orders-today']} text text_type_digits-large`}>{totalToday}</span>
      </div>
    </>
  );
};

export default OrderComplited;
