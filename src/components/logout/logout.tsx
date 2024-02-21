import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/reducers/auth-slice/auth-slice';
import styles from './logout.module.css';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/consts';

const Logout = (): JSX.Element => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // @ts-ignore
    dispatch(logoutUser())
      .then(() => {
        localStorage.setItem(ACCESS_TOKEN, '');
        localStorage.setItem(REFRESH_TOKEN, '');
        navigate('/')
      })

  }, [dispatch, navigate])

  return(
    <div className='container'>
      <p>Вы вышли из системы</p>
    </div>
  )
}

export default Logout;
