import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { ingredientPropTypes } from '../../../utils/ingredient-prop-types';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IIngredient } from '../../../types/ingredient';

type TBurgerIngredient = {
  ingredient: IIngredient,
  index: number,
  swapCard: (fromIndex: number, toIndex: number) => void,
  handleDelete: (ingredient: string) => void,
  ingrediantId: string
}

const BurgerIngredient = ({ ingredient, index, swapCard, handleDelete, ingrediantId }: TBurgerIngredient) => {
  const ref = useRef(null)

  const [, drag] = useDrag({
    type: 'swap',
    item: {index}
  })

  const [, drop] = useDrop<{index: number}>({
    accept: 'swap',
    drop(item) {
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
        handleClose={() => handleDelete(ingrediantId)}
      />
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes
};

export default BurgerIngredient;
