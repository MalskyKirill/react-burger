import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../services/hooks';
import FeedElement from '../feed-element/feed-element';
import styles from './feed-list.module.css';

const FeedList = () => {

  const location = useLocation();
  const {orders} = useAppSelector(store => store.orderFeed)

  return (
    <ul className={`${styles[`feed-list`]} custom-scroll`}>
      {orders.map((el) => (
        <Link
          className={styles.link}
          to={`${location.pathname}/${el.number}`}
          key={el._id}
          state={{ background: location }}
        >
          <FeedElement order={el}/>
        </Link>
      ))}
    </ul>
  );
};

export default FeedList;
