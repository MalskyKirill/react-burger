import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/ingredient-prop-types';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addDataDetails } from '../../../services/reducers/details-slice';

const IngredientElement = ({ data, counter }) => {

  const dispatch = useDispatch()

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
    const data = {
      name: name,
      img: image_large,
      calories: calories,
      carbohydrates: carbohydrates,
      fat: fat,
      proteins: proteins,
      isModalOpen: true,
    }
    dispatch(addDataDetails(data))
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
      {counter && (
        <Counter
          count={counter}
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
