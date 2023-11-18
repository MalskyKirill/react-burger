import stiles from './main-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { data } from '../../vendor/data';

const MainPage = () => {
  return(
    <main className={stiles.content}>
      <BurgerIngredients data={data}/>
      <BurgerConstructor data={data}/>
    </main>
  );
}

export default MainPage;
