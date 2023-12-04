import stiles from './main-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/ingredient-prop-types';

const MainPage = ({ handleCardClick, handleOrderClick }) => {
  return (
    <main className={stiles.content}>
      <BurgerIngredients handleCardClick={handleCardClick} />
      {/* {(
        <BurgerConstructor
          handleOrderClick={handleOrderClick}
        />
      ) : (
        <></>
      )} */}
    </main>
  );
};

MainPage.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
  handleCardClick: PropTypes.func,
  handleOrderClick: PropTypes.func,
};

export default MainPage;
