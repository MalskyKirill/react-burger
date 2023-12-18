import styles from './login-page.module.css';
import SignForm from '../../components/sign-form/sign-form';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <main className={styles.content}>
      <section className={styles.sign}>
        <h2 className={styles['sign-title']}>Вход</h2>
        <SignForm />
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Вы — новый пользователь?<Link className={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className='text text_type_main-default text_color_inactive mt-4'>
        Забыли пароль?<Link className={styles.link}>Восстановить пароль</Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
