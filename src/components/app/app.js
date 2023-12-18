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
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPassword from '../../pages/forgot-password/forgot-password';

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
          <Route path={AppRoute.register} element={<RegisterPage />}/>
          <Route path={AppRoute.forgotPassword} element={<ForgotPassword/>} />
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
