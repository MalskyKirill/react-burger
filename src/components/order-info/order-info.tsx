import styles from './order-info.module.css';
import { selectAllIngredients } from '../../services/reducers/ingredients-slice/ingredients-slice';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useEffect } from 'react';
import { getCurrentOrder } from '../../services/reducers/order-slice/order-slice';
import Preloader from '../preloader/preloader';
import { IIngredient } from '../../types/ingredient';

type TCountUnicIngredients = {
  item: { [name: string]: IIngredient };
  count: { [name: string]: number };
};

const OrderInfo = () => {
  const dispatch = useAppDispatch();

  const { number } = useParams();
  const allIngredients = useAppSelector(selectAllIngredients);

  const numberOrder = Number(number);

  const currentOrder = useAppSelector((store) => {
    let order = store.orderFeed.orders.find((el) => el.number === numberOrder);
    if (order) return order;

    order = store.orderFeedProfile.orders.find(
      (el) => el.number === numberOrder
    );
    if (order) return order;

    return store.order.order;
  });

  useEffect(() => {
    if (!currentOrder) {
      dispatch(getCurrentOrder(numberOrder));
    }
  }, [number]);

  if (!currentOrder) {
    return <Preloader />;
  }

  const orderStatus =
    currentOrder.status === 'done' ? 'Выполнен' : 'Готовиться';

  //получаем ингредиенты заказа
  const orderIngredients = currentOrder.ingredients.reduce(
    (list: Array<IIngredient>, ingrediantId) => {
      const ingredient = allIngredients.filter((el) => el._id === ingrediantId);
      if (ingredient) {
        list.push(ingredient[0]);
      }
      return list;
    },
    []
  );

  //делаем список айдишников уникальных ингредиентов
  const unicOrderIngredients = Array.from(new Set(orderIngredients)).map(
    (el) => el._id
  );

  //получаем состав бургера с количеством уникальных ингредиентов
  const countUnicIngredients: TCountUnicIngredients = orderIngredients.reduce(
    (acc: TCountUnicIngredients, ingredient: IIngredient) => {
      const id = ingredient._id;
      acc.item[id] = ingredient;
      acc.count[id] = (acc.count[id] || 0) + 1;
      return acc;
    },
    { item: {}, count: {} }
  );

  //получаем цену бургера
  const orderPrice = orderIngredients.reduce((list, ingredient) => {
    return list + ingredient.price;
  }, 0);

  return (
    <div className={styles['order-info-wrap']}>
      <div className={styles['order-info']}>
        <span
          className={`${styles['order-number']} text text_type_digits-default`}
        >{`#${currentOrder.number}`}</span>
        <h3 className={`${styles['order-title']} text text_type_main-medium`}>
          {currentOrder.name}
        </h3>
        <p className={`${styles['order-status']} text text_type_main-default`}>
          {orderStatus}
        </p>
        <h3
          className={`${styles['order-structure']} text text_type_main-medium`}
        >
          Состав:
        </h3>
        <ul className={`${styles['order-ingredients-list']} custom-scroll`}>
          {unicOrderIngredients.map((el, index) => (
            <li className={styles['order-element']} key={index}>
              <div className={styles['img-wrap']}>
                <div className={styles['order-ingredient']}>
                  <img
                    src={countUnicIngredients.item[el].image_mobile}
                    alt='ингредиент'
                  />
                </div>
                <p className='text text_type_main-default'>
                  {countUnicIngredients.item[el].name}
                </p>
              </div>
              <div className={styles['price-wrap']}>
                <span className='text text_type_digits-default'>{`${countUnicIngredients.count[el]} x ${countUnicIngredients.item[el].price}`}</span>
                <CurrencyIcon type={'primary'} />
              </div>
            </li>
          ))}
        </ul>
        <div className={styles['order-footer']}>
          <FormattedDate
            date={new Date(currentOrder.createdAt)}
            className='text text_type_main-default text_color_inactive'
          />
          <div className={styles[`total-price`]}>
            <span className='text text_type_digits-default'>{orderPrice}</span>
            <CurrencyIcon type={'primary'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
