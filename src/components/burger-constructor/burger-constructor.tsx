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
import { getOrderNumber, orderStatus } from '../../services/reducers/order-slice';
import { IIngredient, IBurgerIngredients } from '../../types/ingredient';
import { IHandleDropEl } from '../../types/handle-drop-el';
import { selectUser } from '../../services/reducers/auth-slice';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, AppRoute } from '../../utils/consts';
import Preloader from '../preloader/preloader';

type TBurgerConstructor = {
  handleDropBun: (item: IIngredient) => void,
  handleDropEl: ({ ingredient, id }: IHandleDropEl) => void
}

const BurgerConstructor = ({
  handleDropBun,
  handleDropEl,
}: TBurgerConstructor): JSX.Element => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  //dnd drop логика
  const [, dropBun] = useDrop({
    accept: 'ingredient',
    drop(el: IIngredient) {
      if (el.type === 'bun') handleDropBun(el);
    },
  });

  const [, dropIngredient] = useDrop({
    accept: 'ingredient',
    drop(ingredient: IIngredient) {
      const id = uuidv4();
      if (ingredient.type !== 'bun') handleDropEl({ ingredient, id });
    },
  });

  const swapCard = (fromIndex: number, toIndex: number) => {
    dispatch(swapIngredients({fromIndex, toIndex}))
  };

  //удаление
  const deleteCard = (ingredientId: string) => {
    dispatch(deleteIngredient(ingredientId))
  }

  //получение булки
  const burgerBun: IIngredient = useSelector(selectConstructorBun);

  //получение ингредиентов
  const burgerIngridients: Array<IBurgerIngredients> = useSelector(selectConstructorIngredients);

  //получение токена
  const accessToken: string | null = localStorage.getItem(ACCESS_TOKEN)

  //получение статуса заказа
  const status = useSelector(orderStatus)


  const idBurgerIngridients = [...burgerIngridients.map(el => el.ingredient._id)]

  const handleOrderClick = () => {

    if (!user) {
      navigate(AppRoute.login, { replace: true });
      return;
    }

    // @ts-ignore
    dispatch(getOrderNumber({ingredients: idBurgerIngridients, bun: burgerBun, token: accessToken}))
      // @ts-ignore
      .then((res) => {
        if (res.payload.success) {
          // @ts-ignore
          dispatch(removeConstructorData())
        }
      })
      // @ts-ignore
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
        {status === 'loading' ? <Preloader /> : <BurgerOrder onClick={handleOrderClick}/>}
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerConstructor;
