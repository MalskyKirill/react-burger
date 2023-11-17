import stiles from './main-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

const MainPage = () => {
  return(
    <main className={stiles.content}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default MainPage;
