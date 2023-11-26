import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { ingredientPropTypes } from '../../../utils/ingredient-prop-types';

const BurgerIngredient = ({ ingredient }) => {
  return (
    <li className={styles['burger-ingredient']}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass={styles.color}
      />
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes
};

export default BurgerIngredient;
