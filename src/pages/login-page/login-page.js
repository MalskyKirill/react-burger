import styles from './login-page.module.css';
import SignForm from '../../components/sign-form/sign-form';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/consts';

const LoginPage = () => {
  return (
    <main className={styles.content}>
      <section className={styles.sign}>
        <h2 className={styles['sign-title']}>Вход</h2>
        <SignForm buttonName='Войти' />
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Вы — новый пользователь?
          <Link to={AppRoute.register} className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className='text text_type_main-default text_color_inactive mt-4'>
          Забыли пароль?<Link to={AppRoute.forgotPassword} className={styles.link}>Восстановить пароль</Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
