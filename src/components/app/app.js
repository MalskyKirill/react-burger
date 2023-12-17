import Layout from '../layout/layout';
import MainPage from '../../pages/main-page/main-page';
import { useEffect } from 'react';
import Modal from '../modal/modal';
import IngredienDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadIngredients,
  selectIngredientsInfo,
} from '../../services/reducers/ingredients-slice';
import { selectIsModalDetailsOpen } from '../../services/reducers/details-slice';
import { selectIsModalOrderOpen } from '../../services/reducers/order-slice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../utils/consts';
import LoginPage from '../../pages/login-page/login-page';
import PageNotFound from '../../pages/page-not-found/page-not-found';

function App() {
  const dispatch = useDispatch();
  const { qty } = useSelector(selectIngredientsInfo);

  //открытие модалок
  const isModalIngredientOpen = useSelector(selectIsModalDetailsOpen);
  const isModalOrderOpen = useSelector(selectIsModalOrderOpen);

  useEffect(() => {
    if (!qty) {
      dispatch(loadIngredients());
    }
  }, [qty, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.main} element={<Layout />}>
          <Route index element={<MainPage />}/>
          <Route path={AppRoute.login} element={<LoginPage />}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Route>

        {/* {isModalIngredientOpen && (
          <Modal title={'Детали ингридиента'}>
            <IngredienDetails />
          </Modal>
        )}

        {isModalOrderOpen && (
          <Modal>
            <OrderDetails />
          </Modal>
        )} */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
