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
import { removeModalOrderData, selectIsModalOrderOpen } from '../../services/reducers/order-slice';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/consts';
import LoginPage from '../../pages/login-page/login-page';

import PageNotFound from '../../pages/page-not-found/page-not-found';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile-page/profile-page';
import ProfileRedact from '../profile-redact/profile-redact';
import ProfileOrders from '../profile-orders/profile-orders';
import Logout from '../logout/logout';
import {
  checkUserAuth,
} from '../../services/reducers/auth-slice';
import { OnlyAuth, OnlyUnAuth } from '../protected-router/protected-router';

function App() {
  const dispatch = useDispatch();
  const { qty } = useSelector(selectIngredientsInfo);

  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  //открытие модалок
  const isModalOrderOpen = useSelector(selectIsModalOrderOpen);

  //загрузка ингредиентов
  useEffect(() => {
    if (!qty) {
      // @ts-ignore
      dispatch(loadIngredients());
    }
  }, [qty, dispatch]);

  useEffect(() => {
    // @ts-ignore
    dispatch(checkUserAuth());
  }, []);

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path={AppRoute.main} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path={`${AppRoute.ingredients}/:id`}
            element={<IngredienDetails />}
          ></Route>
          <Route
            path={AppRoute.login}
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path={AppRoute.register}
            element={<OnlyUnAuth component={<RegisterPage />} />}
          />
          <Route
            path={AppRoute.forgotPassword}
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path={AppRoute.resetPassword}
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route
            path={AppRoute.profile}
            element={<OnlyAuth component={<ProfilePage />} />}
          >
            <Route index element={<ProfileRedact />} />
            <Route path={AppRoute.orders} element={<ProfileOrders />} />
            <Route path={AppRoute.logout} element={<Logout />} />
          </Route>

          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path={`${AppRoute.ingredients}/:id`}
            element={
              <Modal
                title={'Детали ингридиента'}
                handleModalClose={handleModalClose}
              >
                <IngredienDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {isModalOrderOpen && (
          <Modal handleModalClose={() => {
            // @ts-ignore
            dispatch(removeModalOrderData())
            }}>
            <OrderDetails />
          </Modal>
        )}
    </>
  );
}

export default App;
