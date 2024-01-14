import styles from './burger-ingredients.module.css';
import BurgerTabs from './burger-tabs/burger-tabs';
import BurgerProductList from './burger-product-list/burger-product-list';
import { useEffect, useRef, useState } from 'react';

const BurgerIngredients = (): JSX.Element => {

  //навигация по ингредиентам
  const [current, setCurrent] = useState('Булки');

  const rootRef = useRef<HTMLElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  const handleScroll = () => {
    if (
      rootRef.current &&
      bunRef.current &&
      sauceRef.current &&
      mainRef.current
    ) {
      const bunSpace = Math.abs(
        rootRef.current.getBoundingClientRect().top -
        bunRef.current.getBoundingClientRect().top
      );
      const sauceSpace = Math.abs(
        rootRef.current.getBoundingClientRect().top -
        sauceRef.current.getBoundingClientRect().top
      );
      const mainSpace = Math.abs(
        rootRef.current.getBoundingClientRect().top -
        mainRef.current.getBoundingClientRect().top
      );
      const minSpace = Math.min(bunSpace, sauceSpace, mainSpace);

      if (minSpace === bunSpace) {
        setCurrent('Булки');
      } else if (minSpace === sauceSpace) {
        setCurrent('Соусы');
      } else {
        setCurrent('Начинки');
      }
    }
  };

  useEffect(() => {
    document.querySelector(`#${current}`)?.scrollIntoView();
  }, [current]);

  return (
    <section className={`${styles['burger-ingredients']}`}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <BurgerTabs current={current} setCurrent={setCurrent} />
      <BurgerProductList
        rootRef={rootRef}
        bunRef={bunRef}
        sauceRef={sauceRef}
        mainRef={mainRef}
        handleScroll={handleScroll}
      />
    </section>
  );
};

export default BurgerIngredients;
