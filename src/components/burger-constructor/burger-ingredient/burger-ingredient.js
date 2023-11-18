import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stiles from './burger-ingredient.module.css';
import PropTypes from 'prop-types';

const BurgerIngredient = ({ingredient}) => {
  return (
    <li className={stiles['burger-ingredient']}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass={stiles.color}
      />
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: PropTypes.object
}

export default BurgerIngredient;
