import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import BurgerOrder from './burger-order/burger-order';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/ingredient-prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { selectConstructorBun, selectConstructorIngredients, swapIngredients, deleteIngredient, removeConstructorData } from '../../services/reducers/constructor-slice';
import { getOrderNumber } from '../../services/reducers/order-slice';

const BurgerConstructor = ({
  handleOrderClick,
  handleDropBun,
  handleDropEl,
}) => {

  const dispatch = useDispatch();

  //dnd drop логика
  const [, dropBun] = useDrop({
    accept: 'ingredient',
    drop(el) {
      if (el.type === 'bun') handleDropBun(el);
    },
  });

  const [, dropIngredient] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      const id = uuidv4();
      if (ingredient.type !== 'bun') handleDropEl({ ingredient, id });
    },
  });

  const swapCard = (fromIndex, toIndex) => {
    dispatch(swapIngredients({fromIndex, toIndex}))
  };

  //удаление
  const deleteCard = (ingredient) => {
    dispatch(deleteIngredient(ingredient))
  }

  //получение булки
  const burgerBun = useSelector(selectConstructorBun);

  //получение ингредиентов
  const burgerIngridients = useSelector(selectConstructorIngredients);

  const idBurgerIngridients = [...burgerIngridients.map(el => el.ingredient._id)]
  const onClick = () => {

    dispatch(getOrderNumber({ingredients: idBurgerIngridients, bun: burgerBun}))
      .then((res) => {
        if (res.payload.success) {
          dispatch(removeConstructorData())
        }
      })
      .catch((err) => {
        console.log(err)
      })

  };

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
                ingredient={el.ingredient}
                index={index}
                key={el.id}
                swapCard={swapCard}
                handleDelete={deleteCard}
                ingrediantId={el.id}
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
        <BurgerOrder handleOrderClick={handleOrderClick} onClick={onClick}/>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerConstructor;
