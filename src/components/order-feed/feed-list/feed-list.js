import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../../utils/consts';
import { dataFeed } from '../../../vendor/data';
import FeedElement from '../feed-element/feed-element';
import styles from './feed-list.module.css';

const FeedList = () => {

  const location = useLocation();
  const {orders} = dataFeed

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
