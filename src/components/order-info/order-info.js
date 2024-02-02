import styles from './order-info.module.css';
import { dataFeed } from '../../vendor/data';
import { selectAllIngredients } from '../../services/reducers/ingredients-slice';
import { useSelector } from 'react-redux';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

const OrderInfo = () => {
  const orderStatus =
    dataFeed.orders[0].status === 'done' ? 'Выполнен' : 'Готовиться';

  const allIngredients = useSelector(selectAllIngredients);

  //получаем ингредиенты заказа
  const orderIngredients = dataFeed.orders[0].ingredients.reduce(
    (list, ingrediantId) => {
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
  const countUnicIngredients = orderIngredients.reduce(
    (acc, ingredient) => {
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
        >{`#${dataFeed.orders[0].number}`}</span>
        <h3 className={`${styles['order-title']} text text_type_main-medium`}>
          {dataFeed.orders[0].name}
        </h3>
        <p className={`${styles['order-status']} text text_type_main-default`}>
          {orderStatus}
        </p>
        <h3
          className={`${styles['order-structure']} text text_type_main-medium`}
        >
          Состав:
        </h3>
        <ul className={styles['order-ingredients-list']}>
          {unicOrderIngredients.map((el, index) => (
            <li className={styles['order-element']} key={index}>
              <div className={styles['img-wrap']}>
                <div className={styles['order-ingredient']}>
                  <img src={countUnicIngredients.item[el].image_mobile} />
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
            date={new Date(dataFeed.orders[0].createdAt)}
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
