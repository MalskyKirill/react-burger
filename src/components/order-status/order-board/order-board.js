import { Link } from 'react-router-dom';
import styles from './order-board.module.css';
import {dataFeed} from '../../../vendor/data';



const OrderBoard = () => {

  const ordesComplited = dataFeed.orders.filter((el) => el.status === 'done')

  const ordersAtWork = dataFeed.orders.filter((el) => el.status === 'pending')

  console.log(ordesComplited)

  return (
    <div className={styles['order-board']}>
      <div className={styles['board-done']}>
        <h3 className={`${styles['board-title']} text text_type_main-medium`}>Готовы:</h3>
        <ul className={styles['board-list']}>
          {ordesComplited.map((el) => (
            <Link
            className={styles['link-done']}
            key={el._id}>
            <li className='text text_type_digits-default'>{el.number}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles['board-work']}>
      <h3 className={`${styles['board-title']} text text_type_main-medium`}>В работе:</h3>
        <ul className={styles['board-list']}>
          {ordersAtWork.map((el) => (
            <Link
            className={styles['link-work']}
            key={el._id}>
            <li className='text text_type_digits-default'>{el.number}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderBoard;
