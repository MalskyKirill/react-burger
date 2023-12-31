import styles from './ingredient-details.module.css';
import NutritionElement from './nutrition-element/nutrition-element';
import { ingredientPropTypes } from '../../utils/ingredient-prop-types';
import { useSelector } from 'react-redux';
import { selectDetailsData } from '../../services/reducers/details-slice';

const IngredienDetails = () => {

  const {name, img, calories, carbohydrates, fat, proteins} = useSelector(selectDetailsData)

  return (
    <div className={styles['ingredient-details']}>
      <img
        className={styles['ingredient-img']}
        src={img}
        alt='ingredient'
      />
      <p
        className={`${styles['ingredient-subtitle']} text text_type_main-medium`}
      >
        {name}
      </p>
      <div className={styles['nutrition-list']}>
        <NutritionElement title={'Калории,ккал'} value={calories} />
        <NutritionElement title={'Белки, г'} value={proteins} />
        <NutritionElement title={'Жиры, г'} value={fat} />
        <NutritionElement title={'Углеводы, г'} value={carbohydrates} />
      </div>
    </div>
  );

};

IngredienDetails.propTypes = {
  selectIngredient: ingredientPropTypes
}

export default IngredienDetails;
