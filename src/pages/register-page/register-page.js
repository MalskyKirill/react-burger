import { Link } from 'react-router-dom';
import SignForm from '../../components/sign-form/sign-form';
import styles from './register-page.module.css';

const RegisterPage = () => {
  return (
    <main className={styles.content}>
      <section className={styles.sign}>
        <h2 className={styles['sign-title']}>Регистрация</h2>
        <SignForm buttonName='Зарегистрироваться'/>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Уже зарегистрированы?<Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;
