import styles from './burger-order.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectConstructorElements } from '../../../services/reducers/constructor-slice';

const BurgerOrder = () => {

  const constructorElements = useSelector(selectConstructorElements);

  //расчет стоимости бургера
  const coastBun = constructorElements.bun ? constructorElements.bun.price * 2 : 0;
  const coastIngredients = constructorElements.ingredients ? constructorElements.ingredients.map((el) => el.ingredient.price).reduce((total, el) => total + el, 0) : 0;

  const totalCoast = coastBun + coastIngredients;

  const onClick = () => {

  }

  return (
    <div className={styles['burger-order']}>
      <div className={styles.coast}>
        <p className='text text_type_digits-medium'>{totalCoast}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        onClick={onClick}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

BurgerOrder.propTypes = {
  coast: PropTypes.number,
  handleOrderClick: PropTypes.func,
};

export default BurgerOrder;
