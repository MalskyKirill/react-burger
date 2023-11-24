import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import PropTypes from 'prop-types';

const IngredientElement = ({
  name,
  image,
  price,
  count,
  handleCardClick,
  fat,
  proteins,
  carbohydrates,
  calories,
  image_large,
}) => {
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
    <li className={styles.ingredient}>
      <img className={styles['ingredient-image']} src={image} alt={name} onClick={onClick}/>
      <div className={styles['ingredient-price']}>
        <p className={'text text_type_main-default pt-1 pb-1 pr-2'}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`${styles['ingredient-name']} text text_type_main-default pb-6`}>
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
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
};

export default IngredientElement;
