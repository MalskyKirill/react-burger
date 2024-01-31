import styles from './order-complited.module.css';
import {dataFeed} from '../../../vendor/data'

const OrderComplited = () => {
  return (
    <>
      <div className={styles['board-complited-all']}>
        <h3 className={`${styles['board-title']} text text_type_main-medium`}>Выполнено за все время:</h3>
        <span className={`${styles['orders-all']} text text_type_digits-large`}>{dataFeed.total}</span>
      </div>
      <div className={styles['board-complited-today']}>
        <h3 className={`${styles['board-title']} text text_type_main-medium`}>Выполнено за сегодня:</h3>
        <span className={`${styles['orders-today']} text text_type_digits-large`}>{dataFeed.totalToday}</span>
      </div>
    </>
  );
};

export default OrderComplited;
