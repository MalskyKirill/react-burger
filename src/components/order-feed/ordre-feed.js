import FeedList from './feed-list/feed-list';
import styles from './order-feed.module.css';

const OrderFeed = ({title}) => {

  return(
    <section className={styles['order-feed']}>
      <h1 className={`${styles['feed-title']} text text_type_main-large pt-10 pb-5`}>{title}</h1>
      <FeedList />
    </section>
  );
}

export default OrderFeed;
