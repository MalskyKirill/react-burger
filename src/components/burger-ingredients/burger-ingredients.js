import stiles from './burger-ingredients.module.css'
import BurgerTabs from './burger-tabs/burger-tabs';
import BurgerProductList from './burger-product-list/burger-product-list';
import PropTypes from 'prop-types';


const BurgerIngredients = ({data}) => {
  return(
    <section className={`${stiles['burger-ingredients']}`}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <BurgerTabs />
      <BurgerProductList data={data}/>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array
}

export default BurgerIngredients;
