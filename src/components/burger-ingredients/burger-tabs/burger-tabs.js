import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

const BurgerTabs = () => {
  const [current, setCurrent] = useState('Булки')


  return (
    <div style={{ display: 'flex' }} className="pt-5">
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
