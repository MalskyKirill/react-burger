import { Link, useNavigate } from 'react-router-dom';
import SignForm from '../../components/sign-form/sign-form';
import styles from './forgot-password.module.css';
import { AppRoute } from '../../utils/consts';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../services/reducers/auth-slice';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const onSubmit = (data) => {
    dispatch(forgotPassword(data))
      .then((res) => {
        if (res.payload.success) navigate(AppRoute.resetPassword)
      })
  };

  return (
    <main className={styles.content}>
      <section className={styles.sign}>
        <h2 className={styles['sign-title']}>Восстановление пароля</h2>
        <SignForm buttonName='Восстановить' onSubmit={onSubmit}/>
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

export default ForgotPassword;
