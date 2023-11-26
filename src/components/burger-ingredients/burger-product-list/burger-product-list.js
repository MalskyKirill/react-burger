import IngredientList from '../ingredient-list/ingredient-list';
import styles from './burger-product-list.module.css';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/ingredient-prop-types';
import { useMemo } from 'react';

const BurgerProductList = ({ data, handleCardClick }) => {

  const dataBun = useMemo(() => data.filter((el) => el.type === 'bun'), [data]);
  const dataMain = useMemo(() => data.filter((el) => el.type === 'main'), [data]);
  const dataSauce = useMemo(() => data.filter((el) => el.type === 'sauce'), [data]);

  return (
    <div className={`${styles['burger-product-list']} custom-scroll`}>
      <IngredientList title={'Булки'} data={dataBun} handleCardClick={handleCardClick}/>
      <IngredientList title={'Соусы'} data={dataSauce} handleCardClick={handleCardClick}/>
      <IngredientList title={'Начинки'} data={dataMain} handleCardClick={handleCardClick}/>
    </div>
  );
};

BurgerProductList.propTypes = {
  data: PropTypes.arrayOf(
    ingredientPropTypes
  ),
  handleCardClick: PropTypes.func
};

export default BurgerProductList;
