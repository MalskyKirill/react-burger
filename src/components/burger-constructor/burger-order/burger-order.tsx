import styles from './burger-order.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { selectConstructorBun, selectConstructorIngredients } from '../../../services/reducers/constructor-slice/constructor-slice';
import { IIngredient } from '../../../types/ingredient';
import {IBurgerIngredients} from '../../../types/ingredient';
import { useMemo } from 'react';

type TBurgerOrder = {
  onClick: () => void
}

const BurgerOrder = ({onClick}: TBurgerOrder): JSX.Element => {

  const constructorBun: IIngredient = useSelector(selectConstructorBun);
  const constructorIngredients: Array<IBurgerIngredients> = useSelector(selectConstructorIngredients);

  const disabledOrder = useMemo(() => {
    const isEmptyOrder = constructorIngredients.length === 0 && !constructorBun;
    return isEmptyOrder;
  }, [constructorBun, constructorIngredients]);

  //расчет стоимости бургера
  const coastBun = constructorBun
    ? constructorBun.price * 2
    : 0;
  const coastIngredients = constructorIngredients
    ? constructorIngredients
        .map((el) => el.ingredient.price)
        .reduce((total, el) => total + el, 0)
    : 0;

  const totalCoast = coastBun + coastIngredients;

  return (
    <div className={styles['burger-order']}>
      <div className={styles.coast}>
        <p className='text text_type_digits-medium'>{totalCoast}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button htmlType='button' type='primary' size='large' onClick={onClick} disabled={disabledOrder} data-testid='submit-button'>
        Оформить заказ
      </Button>
    </div>
  );
};

export default BurgerOrder;
