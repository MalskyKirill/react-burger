import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page/main-page';
import { useEffect, useState } from 'react';
import {urlApi} from '../../utils/consts'
import Modal from '../modal/modal';
import IngredienDetails from '../ingredient-details/ingredient-details';


function App() {

  const [ingredients, setIngredients] = useState([])

  const [selectIngredient, setSelectIngredient] = useState({})

  const [isModalIngredientOpen, setIsModalIngredientOpen] = useState(false);


  const handleCardClick = ({name, image_large, calories, carbohydrates, fat, proteins}) => {
    setSelectIngredient({name, image_large, calories, carbohydrates, fat, proteins})
    setIsModalIngredientOpen(true)
  }

  useEffect(() => {
    fetch(urlApi)
      .then(res => res.json())
      .then(res => setIngredients(res.data))
      .catch((err) => console.log(err));
  }, [])


  return (
    <div className={styles.app}>
      <AppHeader />
      <MainPage ingredients={ingredients} handleCardClick={handleCardClick}/>

      {isModalIngredientOpen && <Modal title={'Детали ингридиента'}>
        <IngredienDetails selectIngredient={selectIngredient}/>
      </Modal>}

    </div>
  );

}

export default App;
