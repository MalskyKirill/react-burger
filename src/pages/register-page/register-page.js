import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SignForm from '../../components/sign-form/sign-form';
import styles from './register-page.module.css';
import {createUser} from '../../services/reducers/auth-slice';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const onSubmit = (data) => {

    dispatch(createUser(data))


  };

  return (
    <main className={styles.content}>
      <section className={styles.sign}>
        <h2 className={styles['sign-title']}>Регистрация</h2>
        <SignForm buttonName='Зарегистрироваться' onSubmit={onSubmit}/>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Уже зарегистрированы?
          <Link to='/login' className={styles.link}>
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
