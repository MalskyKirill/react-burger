import IngredientList from '../ingredient-list/ingredient-list';
import styles from './burger-product-list.module.css';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/ingredient-prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllIngredients } from '../../../services/reducers/ingredients-slice';

type TBurgerIngredients = {
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
}: TBurgerIngredients): JSX.Element => {
  const ingredients = useSelector(selectAllIngredients);

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

BurgerProductList.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
  handleCardClick: PropTypes.func,
};

export default BurgerProductList;
