import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page/main-page';
import { useEffect, useState } from 'react';
import Modal from '../modal/modal';
import IngredienDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { api } from '../../utils/api';
import { IngredientsContext } from '../../context/ingredients-context';

function App() {
  const [ingredients, setIngredients] = useState([]);

  const [selectIngredient, setSelectIngredient] = useState({});

  const [isModalIngredientOpen, setIsModalIngredientOpen] = useState(false);
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);

  // открытие попапа с ингридиентом
  const handleCardClick = ({
    name,
    image_large,
    calories,
    carbohydrates,
    fat,
    proteins,
  }) => {
    setSelectIngredient({
      name,
      image_large,
      calories,
      carbohydrates,
      fat,
      proteins,
    });
    setIsModalIngredientOpen(true);
  };

  const handleOrderClick = () => {
    setIsModalOrderOpen(true);
  };

  //закрытие всех попапов
  const closeAllPopup = () => {
    setIsModalIngredientOpen(false);
    setIsModalOrderOpen(false);
  };

  useEffect(() => {
    api
      .getIngredients()
      .then(({ data }) => setIngredients(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.app}>
      <IngredientsContext.Provider value={ingredients}>
        <AppHeader />
        <MainPage
          ingredients={ingredients}
          handleCardClick={handleCardClick}
          handleOrderClick={handleOrderClick}
        />

        {isModalIngredientOpen && (
          <Modal title={'Детали ингридиента'} onClose={closeAllPopup}>
            <IngredienDetails selectIngredient={selectIngredient} />
          </Modal>
        )}

        {isModalOrderOpen && (
          <Modal onClose={closeAllPopup}>
            <OrderDetails orderNumber={'034536'} />
          </Modal>
        )}
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
