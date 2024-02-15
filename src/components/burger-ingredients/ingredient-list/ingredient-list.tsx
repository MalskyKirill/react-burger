import IngredientElement from '../ingredient-element/ingredient-element';
import styles from './ingredient-list.module.css';
import { useSelector } from 'react-redux';
import { selectConstructorElements } from '../../../services/reducers/constructor-slice/constructor-slice';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../../utils/consts';
import { IIngredient } from '../../../types/ingredient';

type TIngredientList = {
  title: string;
  data: Array<IIngredient>;
  refItem: React.RefObject<HTMLHeadingElement>;
};

const IngredientList = ({
  title,
  data,
  refItem,
}: TIngredientList): JSX.Element => {
  const constructorElements = useSelector(selectConstructorElements);
  const location = useLocation();

  //подсчет количества ингредиентов
  const burgerIngredientsCounter = useMemo(() => {
    const { bun, ingredients } = constructorElements;
    const countElements: Record<string, number> = {};

    for (const elem of ingredients) {
      // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
      countElements[elem.ingredient._id] = countElements[elem.ingredient._id]
        ? countElements[elem.ingredient._id] + 1
        : 1;
    }

    if (bun) countElements[bun._id] = 2;
    return countElements;
  }, [constructorElements]);

  return (
    <>
      <h2 ref={refItem}>{title}</h2>
      <ul className={styles['ingredient-list']}>
        {data.map((el) => (
          <li key={el._id}>
            <Link
              className={styles.link}
              to={`${AppRoute.ingredients}/${el._id}`}
              state={{ background: location }}
            >
              <IngredientElement
                data={el}
                counter={burgerIngredientsCounter[el._id]}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default IngredientList;
