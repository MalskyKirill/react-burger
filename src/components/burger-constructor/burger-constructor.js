import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import BurgerOrder from './burger-order/burger-order';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/ingredient-prop-types';
import { useContext, useEffect, useMemo, useReducer, useState } from 'react';

import { data } from '../../vendor/data';

const BurgerConstructor = ({ handleOrderClick }) => {
  //получение булки
  const burgerBun = null;

  //получение ингредиентов
  const burgerIngridients = null;

  //расчет стоимости только булок или если есть допы
  // const coast = coastState.length === 0 ? burgerBun.price * 2 : burgerBun.price * 2 + coastState.map((el) => el.price).reduce((total, el) => total + el, 0);

  //получаем айдишники ингредиентов
  // const burgerIngrediantsId = [...burgerIngridients, burgerBun].map(
  //   (el) => el._id
  // );

  //меняем стейт ингредиентов в зависимости от количества ингредиентов
  useEffect(() => {}, []);

  return (
    <section className={styles['burger-constructor']}>
      <div className={styles.burger}>
        <div className={styles['burger-head']}>
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
        <ul className={`${styles['burger-ingridients']} custom-scroll`}>
          {burgerIngridients && burgerIngridients.length > 0 ? (
            burgerIngridients.map((el) => (
              <BurgerIngredient ingredient={el} key={el._id} />
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
