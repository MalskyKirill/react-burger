import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SignForm from '../../components/sign-form/sign-form';
import { resetPassword } from '../../services/reducers/auth-slice';
import { AppRoute } from '../../utils/consts';
import styles from './reset-password.module.css';

const ResetPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation()

  console.log(location)

  const onSubmit = (data) => {
    dispatch(resetPassword(data))
      .then((res) => {
        if (res.payload.success) navigate(AppRoute.main);
      });
  };

  useEffect(() => {
    if(location.state?.from !== AppRoute.forgotPassword) {
      return navigate(AppRoute.login)
    }
  }, [])

  return (
    <main className={styles.content}>
      <section className={styles.sign}>
        <h2 className={styles['sign-title']}>Восстановление пароля</h2>
        <SignForm buttonName='Восстановить' onSubmit={onSubmit} />
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Вспомнили пароль?
          <Link to={AppRoute.login} className={styles.link}>
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
};

export default ResetPassword;
