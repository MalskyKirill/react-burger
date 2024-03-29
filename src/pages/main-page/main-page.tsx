import styles from './main-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBun,
  addIngredients,
} from '../../services/reducers/constructor-slice/constructor-slice';
import { selectIngredientsInfo } from '../../services/reducers/ingredients-slice/ingredients-slice';
import Preloader from '../../components/preloader/preloader';
import {IIngredient} from "../../types/ingredient"
import { IHandleDropEl } from '../../types/handle-drop-el';

const MainPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const { status, error } = useSelector(selectIngredientsInfo);

  const handleDropBun = (item: IIngredient) => {
    dispatch(addBun(item));
  };

  const handleDropEl = ({ ingredient, id }: IHandleDropEl) => {
    dispatch(addIngredients({ ingredient, id }));
  };

  return (
    <>
      {status === 'loading' && <Preloader />}
      {error && (
        <h2
          className={`${styles['error-message']} text text_type_main-large text_color_inactive mt-20`}
        >
          Ошибка при получении данных
        </h2>
      )}
      {status === 'received' && (
        <main className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor
              handleDropBun={handleDropBun}
              handleDropEl={handleDropEl}
            />
          </DndProvider>
        </main>
      )}
    </>
  );
};

export default MainPage;
