import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/ingredient-prop-types';
import { useDrag } from 'react-dnd';

const IngredientElement = ({ count, handleCardClick, data }) => {
  const {
    name,
    fat,
    proteins,
    calories,
    carbohydrates,
    image_large,
    image,
    price,
  } = data;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: data,
  });

  const onClick = () => {
    handleCardClick({
      name,
      fat,
      proteins,
      carbohydrates,
      calories,
      image_large,
    });
  };

  return (
    <li className={styles.ingredient} ref={dragRef}>
      <img
        className={styles['ingredient-image']}
        src={image}
        alt={name}
        onClick={onClick}
      />
      <div className={styles['ingredient-price']}>
        <p className={'text text_type_main-default pt-1 pb-1 pr-2'}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p
        className={`${styles['ingredient-name']} text text_type_main-default pb-6`}
      >
        {name}
      </p>
      {count && (
        <Counter
          count={count}
          size='default'
          extraClass='m-1'
          className={styles.counter}
        />
      )}
    </li>
  );
};

IngredientElement.propTypes = {
  data: ingredientPropTypes,
  handleCardClick: PropTypes.func,
  count: PropTypes.number,
};

export default IngredientElement;
