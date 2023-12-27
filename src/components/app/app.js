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
import { getCurrentUser } from '../../services/reducers/auth-slice';

function App() {
  const dispatch = useDispatch();
  const { qty } = useSelector(selectIngredientsInfo);

  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  //открытие модалок
  const isModalOrderOpen = useSelector(selectIsModalOrderOpen);

  useEffect(() => {
    if (!qty) {
      dispatch(loadIngredients());
    }
  }, [qty, dispatch]);

  useEffect(() => {
    dispatch(getCurrentUser())

  }, [dispatch])

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
          <Route path={AppRoute.login} element={<LoginPage />} />
          <Route path={AppRoute.register} element={<RegisterPage />} />
          <Route path={AppRoute.forgotPassword} element={<ForgotPassword />} />
          <Route path={AppRoute.resetPassword} element={<ResetPassword />} />
          <Route path={AppRoute.profile} element={<ProfilePage />}>
            <Route index element={<ProfileRedact />} />
            <Route path={AppRoute.orders} element={<ProfileOrders />} />
            <Route path={AppRoute.logout} element={<Logout />} />
          </Route>

          <Route path='*' element={<PageNotFound />} />
        </Route>

        {/* {isModalOrderOpen && (
          <Modal>
            <OrderDetails />
          </Modal>
        )} */}
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
    </>
  );
}

export default App;
