import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './sign-form.module.css';

const SignForm = ({ buttonName }) => {
  const location = useLocation();
  console.log(location);

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
      {location.pathname === '/register' && <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        value={state.name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='mb-6'
      />}
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
        {buttonName}
      </Button>
    </form>
  );
};

export default SignForm;
