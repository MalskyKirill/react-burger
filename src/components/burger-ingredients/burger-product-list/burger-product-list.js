import IngredientList from '../ingredient-list/ingredient-list';
import styles from './burger-product-list.module.css';
import PropTypes from 'prop-types';

const BurgerProductList = ({ data }) => {
  const dataBun = data.filter((el) => el.type === 'bun');
  const dataMain = data.filter((el) => el.type === 'main');
  const dataSauce = data.filter((el) => el.type === 'sauce');

  return (
    <div className={`${styles['burger-product-list']} custom-scroll`}>
      <IngredientList title={'Булки'} data={dataBun} />
      <IngredientList title={'Соусы'} data={dataSauce} />
      <IngredientList title={'Начинки'} data={dataMain} />
    </div>
  );
};

BurgerProductList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};

export default BurgerProductList;
