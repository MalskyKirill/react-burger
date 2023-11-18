import styles from './burger-order.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerOrder = ({coast}) => {
  return (
    <div className={styles['burger-order']}>
      <div className={styles.coast}>
        <p className="text text_type_digits-medium">{coast}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button htmlType='button' type='primary' size='large'>
        Оформить заказ
      </Button>
    </div>
  );
};

export default BurgerOrder;
