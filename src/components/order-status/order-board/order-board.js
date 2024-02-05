import { Link, useLocation } from 'react-router-dom';
import styles from './order-board.module.css';
import { useAppSelector } from '../../../services/hooks';

const OrderBoard = () => {
  const location = useLocation();

  const { orders } = useAppSelector((store) => store.orderFeed);

  const ordesComplitedLeftList = orders
    .filter((el) => el.status === 'done')
    .slice(0, 5);

    const ordesComplitedLeftRight = orders
    .filter((el) => el.status === 'done')
    .slice(5, 10);

  const ordersAtWork = orders
    .filter((el) => el.status === 'pending')
    .slice(0, 5);

  return (
    <div className={styles['order-board']}>
      <div className={styles['board-done']}>
        <h3 className={`${styles['board-title']} text text_type_main-medium`}>
          Готовы:
        </h3>
        <div className={styles['board-list-wrap']}>
          <ul className={styles['board-list']}>
            {ordesComplitedLeftList.map((el) => (
              <Link
                className={styles['link-done']}
                to={`${location.pathname}/${el.number}`}
                state={{ background: location }}
                key={el._id}
              >
                <li className='text text_type_digits-default'>{el.number}</li>
              </Link>
            ))}
          </ul>
          <ul className={styles['board-list']}>
            {ordesComplitedLeftRight.map((el) => (
              <Link
                className={styles['link-done']}
                to={`${location.pathname}/${el.number}`}
                state={{ background: location }}
                key={el._id}
              >
                <li className='text text_type_digits-default'>{el.number}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles['board-work']}>
        <h3 className={`${styles['board-title']} text text_type_main-medium`}>
          В работе:
        </h3>
        <ul className={styles['board-list']}>
          {ordersAtWork.map((el) => (
            <Link className={styles['link-work']} key={el._id}>
              <li className='text text_type_digits-default'>{el.number}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderBoard;
