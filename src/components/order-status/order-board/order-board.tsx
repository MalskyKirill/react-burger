import { Link, useLocation } from 'react-router-dom';
import styles from './order-board.module.css';
import { useAppSelector } from '../../../services/hooks';
import { useMemo } from 'react';

const OrderBoard = () => {
  const location = useLocation();

  const orders = useAppSelector((store) => store.orderFeed.orders);

  const ordesComplitedLeftList = useMemo(
    () => orders.filter((el) => el.status === 'done').slice(0, 5),
    [orders]
  );

  const ordesComplitedLeftRight = useMemo(
    () => orders.filter((el) => el.status === 'done').slice(5, 10),
    [orders]
  );

  const ordersAtWork = useMemo(
    () => orders.filter((el) => el.status === 'pending').slice(0, 5),
    [orders]
  );

  return (
    <div className={styles['order-board']}>
      <div className={styles['board-done']}>
        <h3 className={`${styles['board-title']} text text_type_main-medium`}>
          Готовы:
        </h3>
        <div className={styles['board-list-wrap']}>
          <ul className={styles['board-list']}>
            {ordesComplitedLeftList.map((el) => (
              <li key={el._id}>
                <Link
                  className={styles['link-done']}
                  to={`${location.pathname}/${el.number}`}
                  state={{ background: location }}
                >
                  <span className='text text_type_digits-default'>
                    {el.number}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles['board-list']}>
            {ordesComplitedLeftRight.map((el) => (
              <li key={el._id}>
                <Link
                  className={styles['link-done']}
                  to={`${location.pathname}/${el.number}`}
                  state={{ background: location }}
                >
                  <span className='text text_type_digits-default'>
                    {el.number}
                  </span>
                </Link>
              </li>
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
            <li key={el._id}>
              <Link
                className={styles['link-work']}
                to={`${location.pathname}/${el.number}`}
                state={{ background: location }}
              >
                <span className='text text_type_digits-default'>
                  {el.number}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderBoard;
