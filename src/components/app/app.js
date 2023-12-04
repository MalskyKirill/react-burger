import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page/main-page';
import { useEffect, useState } from 'react';
import Modal from '../modal/modal';
import IngredienDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { api } from '../../utils/api';
import Preloader from '../preloader/preloader';
import { useDispatch, useSelector } from 'react-redux';
import {loadIngredients, selectIngredientsInfo} from '../../services/reducers/ingredients-slice'

function App() {
  // const [state, setState] = useState({
  //   ingredients: [],
  //   isLoading: true,
  //   isError: false,
  // });

  const dispatch = useDispatch()

  const {qnt, status, error} = useSelector(selectIngredientsInfo)

  const [selectIngredient, setSelectIngredient] = useState({});

  const [orderNumber, setOrderNumber] = useState(null);

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
    setIsModalIngredientOpen(false);
    setIsModalOrderOpen(false);
  };

  useEffect(() => {
    // api
    //   .getIngredients()
    //   .then(({ data }) =>
    //     setState({ ingredients: data, isLoading: false, isError: false })
    //   )
    //   .catch((err) => {
    //     console.log(err);
    //     setState({ ingredients: null, isLoading: false, isError: true });
    //   });

    if(!qnt) {
      dispatch(loadIngredients())
    }

  }, [qnt, dispatch]);

  console.log(qnt);
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
        {qnt > 0 &&<MainPage
          handleCardClick={handleCardClick}
          handleOrderClick={handleOrderClick}
        />}

        {isModalIngredientOpen && (
          <Modal title={'Детали ингридиента'} onClose={closeAllPopup}>
            <IngredienDetails selectIngredient={selectIngredient} />
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
