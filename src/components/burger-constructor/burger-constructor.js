import stiles from './burger-constructor.module.css';
import { data } from '../../vendor/data.js';
import {
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import BurgerOrder from './burger-order/burger-order';

const BurgerConstructor = () => {
  const burgerBunTop = data[0];
  const burgerBunBottom = data[data.length - 1];

  const burgerIngridients = data.slice(1, -1);

  const coast = data.map(el => el.price).reduce((total, el) => total + el, 0)

  return (
    <section className={stiles['burger-constructor']}>
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        className='burger'
      >
        <div className={stiles['burger-head']}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={burgerBunTop.name}
            price={burgerBunTop.price}
            thumbnail={burgerBunTop.image}
            extraClass={stiles.color}
          />
        </div>
        <ul
          className={`${stiles['burger-ingridients']} custom-scroll`}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          {burgerIngridients.map((el) => (
            <BurgerIngredient ingredient={el} key={el._id} />
          ))}
        </ul>
        <div className={stiles['burger-bottom']}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={burgerBunBottom.name}
            price={burgerBunBottom.price}
            thumbnail={burgerBunBottom.image}
            extraClass={stiles.color}
          />
        </div>
        <BurgerOrder coast={coast}/>
      </div>
    </section>
  );
};

export default BurgerConstructor;
