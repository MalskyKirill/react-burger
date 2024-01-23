import styles from './order-details.module.css';
import done from '../../images/done.svg'
import { useSelector } from 'react-redux';
import { orderNumber } from '../../services/reducers/order-slice';

const OrderDetails = (): JSX.Element => {

  const orderNum: number | null = useSelector(orderNumber)

  return (
    <div className={styles['order-details']}>
      <p className={`${styles['order-number']} text text_type_digits-large`}>{orderNum}</p>
      <p className={`${styles['order-id']} text text_type_main-medium`}>идентификатор заказа</p>
      <img src={done} className={styles['orger-img']} alt='done' />
      <p className={`${styles['order-begin']} text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`${styles['order-weit']} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;
