import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-tabs.module.css'

const BurgerTabs = ({current, setCurrent}) => {

  return (
    <div className={`${styles.tabs} pt-5`}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export default BurgerTabs;
