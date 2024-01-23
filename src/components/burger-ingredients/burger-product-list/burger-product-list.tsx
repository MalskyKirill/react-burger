import IngredientList from '../ingredient-list/ingredient-list';
import styles from './burger-product-list.module.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllIngredients } from '../../../services/reducers/ingredients-slice';
import {IIngredient} from '../../../types/ingredient';

type TBurgerProductList = {
  rootRef:  React.RefObject<HTMLDivElement>
  bunRef: React.RefObject<HTMLHeadingElement>;
  sauceRef: React.RefObject<HTMLHeadingElement>;
  mainRef: React.RefObject<HTMLHeadingElement>;
  handleScroll: () => void;
};

const BurgerProductList = ({
  rootRef,
  bunRef,
  sauceRef,
  mainRef,
  handleScroll,
}: TBurgerProductList): JSX.Element => {

  const ingredients: Array<IIngredient> = useSelector(selectAllIngredients);

  const dataBun = useMemo(
    () => ingredients.filter((el: { type: string }) => el.type === 'bun'),
    [ingredients]
  );
  const dataMain = useMemo(
    () => ingredients.filter((el: { type: string }) => el.type === 'main'),
    [ingredients]
  );
  const dataSauce = useMemo(
    () => ingredients.filter((el: { type: string }) => el.type === 'sauce'),
    [ingredients]
  );

  return (
    <div
      className={`${styles['burger-product-list']} custom-scroll`}
      ref={rootRef}
      onScroll={handleScroll}
    >
      <IngredientList title={'Булки'} data={dataBun} refItem={bunRef} />
      <IngredientList title={'Соусы'} data={dataSauce} refItem={sauceRef} />
      <IngredientList title={'Начинки'} data={dataMain} refItem={mainRef} />
    </div>
  );
};

export default BurgerProductList;
