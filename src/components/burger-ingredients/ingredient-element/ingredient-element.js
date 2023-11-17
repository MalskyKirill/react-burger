import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stiles from './ingredient-element.module.css';

const IngredientElement = ({ name, image, price, count }) => {
  return (
    <li className={stiles.ingredient}>
      <img className={stiles['ingredient-image']} src={image} alt={name} />
      <div className={stiles['ingredient-price']}>
        <p className={'text text_type_main-default pt-1 pb-1 pr-2'}>{price}</p>
        <CurrencyIcon type='primary'/>
      </div>
      <p className={'ingredient-name text text_type_main-default pb-6'}>{name}</p>
      {count && (
        <Counter
          count={1}
          size='default'
          extraClass='m-1'
          className={'counter'}
        />
      )}
    </li>
  );
};

export default IngredientElement;
