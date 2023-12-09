import IngredientElement from '../ingredient-element/ingredient-element';
import styles from './ingredient-list.module.css';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/ingredient-prop-types';

const IngredientList = ({ title, data, refItem }) => {
  return (
    <>
      <h2 ref={refItem}>{title}</h2>
      <ul className={styles['ingredient-list']}>
        {data.map((el) => (
          <IngredientElement key={el._id} data={el} count={1}/>
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
