import styles from './burger-ingredients.module.css';
import BurgerTabs from './burger-tabs/burger-tabs';
import BurgerProductList from './burger-product-list/burger-product-list';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/ingredient-prop-types';
import { selectAllIngredients } from '../../services/reducers/ingredients-slice';
import { useSelector } from 'react-redux';

const BurgerIngredients = ({ handleCardClick }) => {

  const ingredients = useSelector(selectAllIngredients)

  return (
    <section className={`${styles['burger-ingredients']}`}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <BurgerTabs />
      <BurgerProductList data={ingredients} handleCardClick={handleCardClick}/>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    ingredientPropTypes
  ),
  handleCardClick: PropTypes.func
};

export default BurgerIngredients;
