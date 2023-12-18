import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './sign-form.module.css';

const SignForm = ({ buttonName }) => {
  const [state, setState] = useState({ email: '', password: '', name: '' });

  const onChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <form className={styles['sign-form']}>
      <EmailInput
        onChange={onChange}
        value={state.email}
        name={'email'}
        isIcon={false}
        extraClass='mb-6'
      />
      <PasswordInput
        onChange={onChange}
        value={state.password}
        name={'password'}
        extraClass='mb-6'
      />
      <Button htmlType='button' type='primary' size='large'>
        Войти
      </Button>
    </form>
  );
};

export default SignForm;
