import stiles from './burger-ingredients.module.css'
import BurgerTabs from './burger-tabs/burger-tabs';
import {data} from '../../vendor/data.js'
import BurgerProductList from './burger-product-list/burger-product-list';


const BurgerIngredients = () => {


  return(
    <section className={`${stiles['burger-ingredients']}`}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <BurgerTabs />
      <BurgerProductList data={data}/>
    </section>
  );
}

export default BurgerIngredients;
