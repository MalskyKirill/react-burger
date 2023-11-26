import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import BurgerOrder from './burger-order/burger-order';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/ingredient-prop-types';

const BurgerConstructor = ({ data, handleOrderClick }) => {
  const burgerBunTop = data[0];
  const burgerBunBottom = data[data.length - 1];

  const burgerIngridients = data.slice(1, -1);

  const coast = data.map((el) => el.price).reduce((total, el) => total + el, 0);

  return (
    <section className={styles['burger-constructor']}>
      <div className={styles.burger}>
        <div className={styles['burger-head']}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${burgerBunTop.name} (верх)`}
            price={burgerBunTop.price}
            thumbnail={burgerBunTop.image}
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
            text={`${burgerBunBottom.name} (низ)`}
            price={burgerBunBottom.price}
            thumbnail={burgerBunBottom.image}
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
