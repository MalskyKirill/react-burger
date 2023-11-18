import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stiles from './burger-ingredient.module.css';

const BurgerIngredient = ({ingredient}) => {
  return (
    <li className={stiles['burger-ingredient']}>
      <DragIcon type='primary' className="pb-2"/>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass={stiles.color}
      />
    </li>
  );
};

export default BurgerIngredient;
