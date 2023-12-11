import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page/main-page';
import { useEffect } from 'react';
import Modal from '../modal/modal';
import IngredienDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Preloader from '../preloader/preloader';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadIngredients,
  selectIngredientsInfo,
} from '../../services/reducers/ingredients-slice';
import { selectIsModalDetailsOpen } from '../../services/reducers/details-slice';
import { selectIsModalOrderOpen } from '../../services/reducers/order-slice';

function App() {
  const dispatch = useDispatch();
  const { qty, status, error } = useSelector(selectIngredientsInfo);

  //открытие модалок
  const isModalIngredientOpen = useSelector(selectIsModalDetailsOpen);
  const isModalOrderOpen = useSelector(selectIsModalOrderOpen);

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
          className={`${styles['error-message']} text text_type_main-large text_color_inactive mt-20`}
        >
          Ошибка при получении данных
        </h2>
      )}
      {status === 'received' && (
        <MainPage/>
      )}

      {isModalIngredientOpen && (
        <Modal title={'Детали ингридиента'}>
          <IngredienDetails />
        </Modal>
      )}

      {isModalOrderOpen && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
