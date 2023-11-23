import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page/main-page';
import { useEffect, useState } from 'react';
import {urlApi} from '../../utils/consts'
import Modal from '../modal/modal';
import ModalOverlay from '../modalOverlay/modal-overlay';

function App() {

  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    fetch(urlApi)
      .then(res => res.json())
      .then(res => setIngredients(res.data))
      .catch((err) => console.log(err));
  }, [])


  return (
    <div className={styles.app}>
      <AppHeader />
      <Modal title={'детали ингридиента'}>

      </Modal>
      <MainPage ingredients={ingredients}/>
    </div>
  );

}

export default App;
