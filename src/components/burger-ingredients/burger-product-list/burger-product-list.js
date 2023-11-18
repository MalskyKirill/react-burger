import IngredientList from '../ingredient-list/ingredient-list';
import stiles from './burger-product-list.module.css';
import PropTypes from 'prop-types';



const BurgerProductList = ({ data }) => {

  const dataBun = data.filter(el => el.type === 'bun')
  const dataMain = data.filter(el => el.type === 'main')
  const dataSauce = data.filter(el => el.type === 'sauce')

  return (
    <div className={`${stiles['burger-product-list']} custom-scroll`}>
      <IngredientList title={'Булки'} data={dataBun} />
      <IngredientList title={'Соусы'} data={dataSauce} />
      <IngredientList title={'Начинки'} data={dataMain} />
    </div>
  );
};

BurgerProductList.propTypes = {
  data: PropTypes.array
}

export default BurgerProductList;
