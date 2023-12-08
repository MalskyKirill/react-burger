import stiles from './main-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/ingredient-prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllIngredients } from '../../services/reducers/ingredients-slice';

const MainPage = ({ handleCardClick, handleOrderClick }) => {
  const elements = useSelector(selectAllIngredients);
  const [draggedElements, setDraggetElements] = useState({
    ingredients: [],
    bun: null,
  });

  const handleDropBun = (item) => {
    setDraggetElements({
      ...draggedElements,
      bun: item,
    });
  };

  const handleDropEl = ({el, id}) => {
    setDraggetElements({
      ...draggedElements,
      ingredients: [
        ...draggedElements.ingredients,
        {...elements.filter((item) => item._id === el._id),
        id: id
        },
      ],
    });
  };

  return (
    <main className={stiles.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients handleCardClick={handleCardClick} />
        <BurgerConstructor
          handleDropBun={handleDropBun}
          handleDropEl={handleDropEl}
          draggedElements={draggedElements}
          handleOrderClick={handleOrderClick}
          setDraggetElements={setDraggetElements}
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
