import Layout from '../layout/layout';
import MainPage from '../../pages/main-page/main-page';
import { useEffect } from 'react';
import Modal from '../modal/modal';
import IngredienDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { loadIngredients } from '../../services/reducers/ingredients-slice/ingredients-slice';
import {
  removeModalOrderData, selectIsModalOrderOpen,
} from '../../services/reducers/order-slice/order-slice';
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
import { checkUserAuth } from '../../services/reducers/auth-slice/auth-slice';
import { OnlyAuth, OnlyUnAuth } from '../protected-router/protected-router';
import { useAppDispatch } from '../../services/hooks';
import OrderPage from '../../pages/order-page/order-page';
import OrderInfo from '../order-info/order-info';
import { useSelector } from 'react-redux';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  //открытие модалок
  const isModalOrderOpen = useSelector(selectIsModalOrderOpen);

  //загрузка ингредиентов
  useEffect(() => {
    // @ts-ignore
    dispatch(loadIngredients());
  }, [dispatch]);

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
          />
          <Route path={AppRoute.feed} element={<OrderPage />} />
          <Route
            path={`${AppRoute.feed}/:number`}
            element={<OrderInfo />}
          />
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
          <Route
            path={`${AppRoute.orders}/:number`}
            element={<OnlyAuth component={<OrderInfo />} />}
          />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path={`${AppRoute.ingredients}/:id`}
            element={
              <Modal
                title={'Детали ингредиента'}
                handleModalClose={handleModalClose}
              >
                <IngredienDetails />
              </Modal>
            }
          />
          <Route
            path={`${AppRoute.feed}/:number`}
            element={
              <Modal handleModalClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={`${AppRoute.orders}/:number`}
            element={
              <OnlyAuth
                component={
                  <Modal handleModalClose={handleModalClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
      {isModalOrderOpen && (
        <Modal
          handleModalClose={() => {
            // @ts-ignore
            dispatch(removeModalOrderData());
          }}
        >
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
