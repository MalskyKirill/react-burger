import IngredientElement from '../ingredient-element/ingredient-element';
import styles from './ingredient-list.module.css';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/ingredient-prop-types';
import { useSelector } from 'react-redux';
import { selectConstructorElements } from '../../../services/reducers/constructor-slice';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../../utils/consts';

const IngredientList = ({ title, data, refItem }) => {
  const constructorElements = useSelector(selectConstructorElements);
  const location = useLocation();

  //подсчет количества ингредиентов
  const burgerIngredientsCounter = useMemo(() => {
    const { bun, ingredients } = constructorElements;
    const countElements = {};

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
          <Link className={styles.link} to={`${AppRoute.ingredients}/${el._id}`} key={el._id} state={{ background: location }}>
            <IngredientElement
              data={el}
              counter={burgerIngredientsCounter[el._id]}
            />
          </Link>
        ))}
      </ul>
    </>
  );
};

IngredientList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(ingredientPropTypes),
  handleCardClick: PropTypes.func,
};

export default IngredientList;
