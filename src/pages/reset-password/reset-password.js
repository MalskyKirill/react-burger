import { Link } from 'react-router-dom';
import SignForm from '../../components/sign-form/sign-form';
import { AppRoute } from '../../utils/consts';
import styles from './reset-password.module.css';

const ResetPassword = () => {
  return (
    <main className={styles.content}>
      <section className={styles.sign}>
        <h2 className={styles['sign-title']}>Восстановление пароля</h2>
        <SignForm buttonName='Восстановить' />
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Вспомнили пароль?
          <Link to={AppRoute.login} className={styles.link}>
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}

export default ResetPassword;
