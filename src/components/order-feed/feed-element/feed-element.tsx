import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-element.module.css';
import { MAXIMUM_NUMBER_OF_RENDERED_INGREDIENTS } from '../../../utils/consts';
import { useSelector } from 'react-redux';
import { selectAllIngredients } from '../../../services/reducers/ingredients-slice/ingredients-slice';
import { IOrder } from '../../../types/order';
import { IIngredient } from '../../../types/ingredient';
import { useMemo } from 'react';

type TFeedElement = {
  order: IOrder
}

const FeedElement = ({ order }: TFeedElement): JSX.Element => {
  const allIngredients = useSelector(selectAllIngredients);

  const orderIngredients = useMemo(() => order.ingredients.reduce((list: Array<IIngredient>, ingrediantId) => {
    const ingredient = allIngredients.filter((el) => el._id === ingrediantId);
    if (ingredient) {
      list.push(ingredient[0]);
    }
    return list;
  }, []), [order])

  const visibaleIngredients = orderIngredients.slice(
    0,
    MAXIMUM_NUMBER_OF_RENDERED_INGREDIENTS
  );

  const hiddenIngredients =
    order.ingredients.length - MAXIMUM_NUMBER_OF_RENDERED_INGREDIENTS;

  const orderPrice = orderIngredients.reduce((list, ingredient) => {
    return list + ingredient.price;
  }, 0);

  return (
    <div className={styles['feed-container']}>
      <div className={styles['feed-header']}>
        <p
          className={`${styles['order-number']} text text_type_digits-default`}
        >{`#${order.number}`}</p>
        <FormattedDate
          date={new Date(order.createdAt)}
          className='text text_type_main-default text_color_inactive'
        />
      </div>
      <h3 className={`${styles['order-name']} text text_type_main-medium`}>
        {order.name}
      </h3>
      <div className={styles['order-details']}>
        <ul className={styles['order-ingredients']}>
          {visibaleIngredients.map((el, index) => {
            return (
              <li
                className={styles['order-ingredient']}
                key={index}
              >
                <img src={el.image_mobile} alt='ingredient' />
              </li>
            );
          })}
          {order.ingredients.length > 6 && (
            <div className={styles['order-ingredient-hidden']}>
              <p>{`+${hiddenIngredients}`}</p>
            </div>
          )}
        </ul>
        <div
          className={`${styles['order-price']} text text_type_digits-default`}
        >
          {orderPrice}
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </div>
  );
};

export default FeedElement;
