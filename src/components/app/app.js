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
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppRoute } from '../../utils/consts';
import LoginPage from '../../pages/login-page/login-page';

import PageNotFound from '../../pages/page-not-found/page-not-found';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import IngredientElement from '../burger-ingredients/ingredient-element/ingredient-element';

function App() {
  const dispatch = useDispatch();
  const { qty } = useSelector(selectIngredientsInfo);

  const location = useLocation();

  const background = location.state && location.state.background;

  //открытие модалок
  const isModalIngredientOpen = useSelector(selectIsModalDetailsOpen);
  const isModalOrderOpen = useSelector(selectIsModalOrderOpen);

  useEffect(() => {
    if (!qty) {
      dispatch(loadIngredients());
    }
  }, [qty, dispatch]);

  return (
    // <Routes location={background || location}>
    <Routes>
      <Route path={AppRoute.main} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={`${AppRoute.ingredients}/:id`} element={<IngredienDetails />} ></Route>
        <Route path={AppRoute.login} element={<LoginPage />} />
        <Route path={AppRoute.register} element={<RegisterPage />} />
        <Route path={AppRoute.forgotPassword} element={<ForgotPassword />} />
        <Route path={AppRoute.resetPassword} element={<ResetPassword />} />
        <Route path='*' element={<PageNotFound />} />
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
  );
}

export default App;
