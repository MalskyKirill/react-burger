import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addDataDetails } from '../../../services/reducers/details-slice/details-slice';
import {IIngredient} from '../../../types/ingredient';

type TIngredientElement = {
  data: IIngredient,
  counter: number
}

const IngredientElement = ({ data, counter }: TIngredientElement): JSX.Element => {

  const dispatch = useDispatch()

  const {
    name,
    fat,
    proteins,
    calories,
    carbohydrates,
    image_large,
    image,
    price,
    _id
  } = data;


  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: data,
  });

  const onClick = () => {
    const data = {
      name: name,
      img: image_large,
      calories: calories,
      carbohydrates: carbohydrates,
      fat: fat,
      proteins: proteins,
      isModalOpen: true,
      _id: _id
    }
    dispatch(addDataDetails(data))
  };

  return (
    <div className={styles.ingredient} ref={dragRef} data-testid={_id}>
      <img
        className={styles['ingredient-image']}
        src={image}
        alt={name}
        onClick={onClick}
      />
      <div className={styles['ingredient-price']}>
        <p className={'text text_type_main-default pt-1 pb-1 pr-2'}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p
        className={`${styles['ingredient-name']} text text_type_main-default pb-6`}
      >
        {name}
      </p>
      {counter && (
        <Counter
          count={counter}
          size='default'
          extraClass='m-1'
        />
      )}
    </div>
  );
};

export default IngredientElement;
