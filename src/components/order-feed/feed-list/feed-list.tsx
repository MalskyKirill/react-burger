import { Link, useLocation } from 'react-router-dom';
import { IOrder } from '../../../types/order';
import FeedElement from '../feed-element/feed-element';
import styles from './feed-list.module.css';

type TFeedList = {
  orders: Array<IOrder>
}

const FeedList = ({orders}: TFeedList): JSX.Element => {

  const location = useLocation();

  return (
    <ul className={`${styles[`feed-list`]} custom-scroll`}>
      {orders.map((el) => (
        <li key={el._id}>
        <Link
          className={styles.link}
          to={`${location.pathname}/${el.number}`}
          state={{ background: location }}
        >
          <FeedElement order={el}/>
        </Link>
        </li>
      ))}
    </ul>
  );
};

export default FeedList;
