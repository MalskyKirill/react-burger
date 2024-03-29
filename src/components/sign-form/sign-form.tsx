import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './sign-form.module.css';
import { AppRoute } from '../../utils/consts';
import { ISubmitFormData } from '../../types/submit-form-data';

type TSignForm = {
  buttonName: string,
  onSubmit: (data: ISubmitFormData) => void
}

const SignForm = ({ buttonName, onSubmit }: TSignForm): JSX.Element => {

  const initialState = {
    email: '',
    password: '',
    name: '',
    token: '',
  }

  const location = useLocation();

  const [state, setState] = useState(initialState);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    onSubmit(state)

    setState(initialState)
  };

  return (
    <form className={styles['sign-form']} onSubmit={onSubmitForm}>
      {/* в зависимости от url отображаются разные инпуты */}
      {location.pathname === AppRoute.register && (
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={state.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />
      )}
      {(location.pathname === AppRoute.register ||
        location.pathname === AppRoute.login) && (
        <>
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
        </>
      )}
      {location.pathname === AppRoute.forgotPassword && (
        <EmailInput
          onChange={onChange}
          value={state.email}
          name={'email'}
          placeholder={'Укажите e-mail'}
          isIcon={false}
          extraClass='mb-6'
        />
      )}
      {location.pathname === AppRoute.resetPassword && (
        <>
          <PasswordInput
            onChange={onChange}
            value={state.password}
            name={'password'}
            placeholder={'Введите новый пароль'}
            extraClass='mb-6'
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChange}
            value={state.token}
            name={'token'}
            size={'default'}
            extraClass='mb-6'
          />
        </>
      )}
      <Button type='primary' htmlType='submit' size='large'>
        {buttonName}
      </Button>
    </form>
  );
};

export default SignForm;
