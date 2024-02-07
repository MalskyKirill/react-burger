import { IOrder } from '../../types/order';
import FeedList from './feed-list/feed-list';
import styles from './order-feed.module.css';

type TOrderFeed = {
  title?: string,
  orders: Array<IOrder>
}

const OrderFeed = ({title, orders}: TOrderFeed): JSX.Element => {

  return(
    <section className={styles['order-feed']}>
      {title && <h1 className={`${styles['feed-title']} text text_type_main-large pt-10 pb-5`}>{title}</h1>}
      <FeedList orders={orders} />
    </section>
  );
}

export default OrderFeed;
