import IngredientElement from '../ingredient-element/ingredient-element';
import styles from './ingredient-list.module.css';
import PropTypes from 'prop-types';

const IngredientList = ({ title, data }) => {
  return (
    <>
      <h2>{title}</h2>
      <ul className={styles['ingredient-list']}>
        {data.map((el) => (
          <IngredientElement
            name={el.name}
            key={el._id}
            image={el.image}
            price={el.price}
            count={1}
          />
        ))}
      </ul>
    </>
  );
};

IngredientList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};

export default IngredientList;
