import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import BurgerOrder from './burger-order/burger-order';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/ingredient-prop-types';
import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { data } from '../../vendor/data';
import { useDrop } from 'react-dnd';

const BurgerConstructor = ({
  handleOrderClick,
  draggedElements,
  handleDropBun,
  handleDropEl,
  setDraggetElements,
}) => {
  const [, dropBun] = useDrop({
    accept: 'ingredient',
    drop(el) {
      console.log(el);
      if (el.type === 'bun') handleDropBun(el);
    },
  });

  const [, dropIngredient] = useDrop({
    accept: 'ingredient',
    drop(el) {
      const id = uuidv4();
      if (el.type !== 'bun') handleDropEl({ el, id });
    },
  });

  const swapCard = (fromIndex, toIndex) => {

    const swapIngredients = [...draggedElements.ingredients];

    console.log(swapIngredients)

    swapIngredients.splice(toIndex, 0, swapIngredients.splice(fromIndex, 1)[0]);

    console.log(swapIngredients);

    setDraggetElements({
      ...draggedElements,
      ingredients: swapIngredients,
    });
  };

  //получение булки
  const burgerBun = draggedElements.bun;

  //получение ингредиентов
  const burgerIngridients = draggedElements.ingredients;

  //расчет стоимости только булок или если есть допы
  // const coast = coastState.length === 0 ? burgerBun.price * 2 : burgerBun.price * 2 + coastState.map((el) => el.price).reduce((total, el) => total + el, 0);

  //получаем айдишники ингредиентов
  // const burgerIngrediantsId = [...burgerIngridients, burgerBun].map(
  //   (el) => el._id
  // );

  return (
    <section className={styles['burger-constructor']}>
      <div className={styles.burger}>
        <div className={styles['burger-head']} ref={dropBun}>
          {burgerBun ? (
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${burgerBun.name} (верх)`}
              price={burgerBun.price}
              thumbnail={burgerBun.image}
              extraClass={styles.color}
            />
          ) : (
            <div className={styles['empty-bun-top']}>
              <p className='text text_type_main-default'>Перетащите булку</p>
            </div>
          )}
        </div>
        <ul
          className={`${styles['burger-ingridients']} custom-scroll`}
          ref={dropIngredient}
        >
          {burgerIngridients && burgerIngridients.length > 0 ? (
            burgerIngridients.map((el, index) => (
              <BurgerIngredient
                ingredient={el[0]}
                index={index}
                key={el.id}
                swapCard={swapCard}
              />
            ))
          ) : (
            <div className={styles['empty-infredient']}>
              <p className='text text_type_main-default'>Перетащите начинку</p>
            </div>
          )}
        </ul>
        <div className={styles['burger-bottom']}>
          {burgerBun ? (
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={`${burgerBun.name} (низ)`}
              price={burgerBun.price}
              thumbnail={burgerBun.image}
              extraClass={styles.color}
            />
          ) : (
            <div className={styles['empty-bun-bottom']}>
              <p className='text text_type_main-default'>Перетащите булку</p>
            </div>
          )}
        </div>
        {/* <BurgerOrder coast={coast} handleOrderClick={handleOrderClick} burgerIngrediantsId={burgerIngrediantsId} /> */}
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerConstructor;
