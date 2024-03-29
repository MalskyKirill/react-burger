import styles from './login-page.module.css';
import SignForm from '../../components/sign-form/sign-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/consts';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/reducers/auth-slice/auth-slice';
import { ISubmitFormData } from '../../types/submit-form-data';


const LoginPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data: ISubmitFormData) => {
    // @ts-ignore
    dispatch(loginUser(data))
      // @ts-ignore
      .then((res) => {
        if (res.payload?.success) navigate(location.state?.from || '/');
      })
      // @ts-ignore
      .catch(err => console.log(err))
  };


  return (
    <main className={styles.content}>
      <section className={styles.sign}>
        <h2 className={styles['sign-title']}>Вход</h2>
        <SignForm buttonName='Войти' onSubmit={onSubmit} />
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Вы — новый пользователь?
          <Link to={AppRoute.register} className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className='text text_type_main-default text_color_inactive mt-4'>
          Забыли пароль?
          <Link to={AppRoute.forgotPassword} className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
