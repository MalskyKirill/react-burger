import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { ingredientPropTypes } from '../../../utils/ingredient-prop-types';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const BurgerIngredient = ({ ingredient, index, swapCard }) => {
  const ref = useRef(null)

  const [, drag] = useDrag({
    type: 'swap',
    item: {index}
  })

  const [, drop] = useDrop({
    accept: 'swap',
    drop(item) {
      console.log(item)
      if(index !== item.index){
        swapCard(index, item.index)
      }
    }
  })

  drag(drop(ref))

  return (
    <li className={styles['burger-ingredient']} ref={ref}>
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
