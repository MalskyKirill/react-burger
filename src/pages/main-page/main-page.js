import stiles from './main-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/ingredient-prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBun, addIngredients } from '../../services/reducers/constructor-slice';

const MainPage = ({ handleOrderClick }) => {
  const dispatch = useDispatch()

  const handleDropBun = (item) => {
    dispatch(addBun(item))
  };

  const handleDropEl = ({ingredient, id}) => {
    dispatch(addIngredients({ingredient, id}))
  };

  return (
    <main className={stiles.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor
          handleDropBun={handleDropBun}
          handleDropEl={handleDropEl}
          handleOrderClick={handleOrderClick}
        />
      </DndProvider>
    </main>
  );
};

MainPage.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
  handleCardClick: PropTypes.func,
  handleOrderClick: PropTypes.func,
};

export default MainPage;
