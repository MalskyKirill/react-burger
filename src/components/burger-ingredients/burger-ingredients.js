import styles from './burger-ingredients.module.css';
import BurgerTabs from './burger-tabs/burger-tabs';
import BurgerProductList from './burger-product-list/burger-product-list';
import PropTypes from 'prop-types';

const BurgerIngredients = ({ data, handleCardClick }) => {

  return (
    <section className={`${styles['burger-ingredients']}`}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <BurgerTabs />
      <BurgerProductList data={data} handleCardClick={handleCardClick}/>
    </section>
  );
};

BurgerIngredients.propTypes = {
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

export default BurgerIngredients;
