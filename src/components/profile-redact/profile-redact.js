import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, selectUser } from '../../services/reducers/auth-slice';
import styles from './profile-redact.module.css';

const ProfileRedact = () => {

  const dispatch = useDispatch();

  const currentUser = useSelector(selectUser)


  const [state, setState] = useState({
    email: '',
    password: '',
    name: '',
  });

  useEffect(() => {
    setState({name: currentUser ? currentUser.name : '', email: currentUser ? currentUser.email : '', password: ''})
  }, [])


  const onChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <form className={styles['profile-form']}>
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
        icon='EditIcon'

      />
      <EmailInput
        onChange={onChange}
        value={state.email}
        name={'email'}
        isIcon={true}
        extraClass='mb-6'

      />
      <PasswordInput
        onChange={onChange}
        icon="EditIcon"
        value={state.password}
        name={'password'}
        extraClass='mb-6'
      />

      <Button htmlType='button' type='secondary' size='large'>
        Отмена
      </Button><Button htmlType='button' type='primary' size='large'>
          Cохранить
        </Button>
    </form>
  );
};

export default ProfileRedact;
