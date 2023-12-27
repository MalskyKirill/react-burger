import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/reducers/auth-slice';
import styles from './logout.module.css';

const Logout = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logoutUser())
      .then(() => {
        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');
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
