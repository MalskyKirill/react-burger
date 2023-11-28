import styles from './burger-order.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerOrder = ({ coast, handleOrderClick, burgerIngrediantsId }) => {

  const onClick = () => {
    handleOrderClick(burgerIngrediantsId)
  }

  return (
    <div className={styles['burger-order']}>
      <div className={styles.coast}>
        <p className='text text_type_digits-medium'>{coast}</p>
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
