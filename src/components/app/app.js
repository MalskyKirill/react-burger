import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page/main-page';
import { useEffect, useMemo, useState } from 'react';
import Modal from '../modal/modal';
import IngredienDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { api } from '../../utils/api';
import Preloader from '../preloader/preloader';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadIngredients,
  selectIngredientsInfo,
} from '../../services/reducers/ingredients-slice';
import { selectIsModalDetailsOpen } from '../../services/reducers/details-slice';
import { selectConstructorElements } from '../../services/reducers/constructor-slice';

function App() {
  const dispatch = useDispatch();
  const { qty, status, error } = useSelector(selectIngredientsInfo);

  const [orderNumber, setOrderNumber] = useState(null);

  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);

  const isModalIngredientOpen = useSelector(selectIsModalDetailsOpen)

  //создание заказа
  const handleOrderClick = (burgerIngrediantsId) => {
    api
      .addOrder(burgerIngrediantsId)
      .then(({ order }) => setOrderNumber(order.number))
      .catch((err) => console.log(err));

    setIsModalOrderOpen(true);
  };

  //закрытие всех попапов
  const closeAllPopup = () => {
    setIsModalOrderOpen(false);
  };

  useEffect(() => {
    if (!qty) {
      dispatch(loadIngredients());
    }
  }, [qty, dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {status === 'loading' && <Preloader />}
      {error && (
        <h2
          style={{ alignSelf: 'center' }}
          className='text text_type_main-large text_color_inactive mt-20'
        >
          Ошибка при получении данных
        </h2>
      )}
      {status === 'received' && (
        <MainPage
          handleOrderClick={handleOrderClick}
        />
      )}

      {isModalIngredientOpen && (
        <Modal title={'Детали ингридиента'} onClose={closeAllPopup}>
          <IngredienDetails />
        </Modal>
      )}

      {isModalOrderOpen && (
        <Modal onClose={closeAllPopup}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
}

export default App;
