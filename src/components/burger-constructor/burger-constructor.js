import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import BurgerOrder from './burger-order/burger-order';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/ingredient-prop-types';
import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { IngredientsContext } from '../../context/ingredients-context';

const initialState = []

const reducer = (state, action) => {
  switch(action.type) {
    case "ADD_INGREDIENT":
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}

const BurgerConstructor = ({ handleOrderClick }) => {
  //получил ингредиенты из контекста
  const ingredients = useContext(IngredientsContext)

  //стейт ингредиентов
  const [coastState, setDispatch] = useReducer(reducer, initialState)

  //получение булки
  const burgerBun = ingredients[0];

  //получение ингредиентов
  const burgerIngridients = useMemo(() => ingredients.slice(3, -3), [ingredients]);

  //расчет стоимости только булок или если есть допы
  const coast = coastState.length === 0 ? burgerBun.price * 2 : burgerBun.price * 2 + coastState.map((el) => el.price).reduce((total, el) => total + el, 0);

  //меняем стейт ингредиентов в зависимости от количества ингредиентов
  useEffect(() => {
    setDispatch({type: 'ADD_INGREDIENT', payload: burgerIngridients})
  }, [burgerIngridients])

  return (
    <section className={styles['burger-constructor']}>
      <div className={styles.burger}>
        <div className={styles['burger-head']}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${burgerBun.name} (верх)`}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
            extraClass={styles.color}
          />
        </div>
        <ul className={`${styles['burger-ingridients']} custom-scroll`}>
          {burgerIngridients.map((el) => (
            <BurgerIngredient ingredient={el} key={el._id} />
          ))}
        </ul>
        <div className={styles['burger-bottom']}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${burgerBun.name} (низ)`}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
            extraClass={styles.color}
          />
        </div>
        <BurgerOrder coast={coast} handleOrderClick={handleOrderClick} />
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerConstructor;
