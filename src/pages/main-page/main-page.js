import stiles from './main-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { data } from '../../vendor/data';

const MainPage = ({ingredients, handleCardClick}) => {
  return(
    <main className={stiles.content}>
      <BurgerIngredients data={ingredients} handleCardClick={handleCardClick}/>
      {ingredients.length > 0 ? <BurgerConstructor data={ingredients}/> : <></>}
    </main>
  );
}

export default MainPage;
