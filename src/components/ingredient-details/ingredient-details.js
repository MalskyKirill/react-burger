import styles from './ingredient-details.module.css';
import NutritionElement from './nutrition-element/nutrition-element';
import { ingredientPropTypes } from '../../utils/ingredient-prop-types';
import { useSelector } from 'react-redux';
import { selectDetailsData } from '../../services/reducers/details-slice';
import { selectAllIngredients } from '../../services/reducers/ingredients-slice';
import { useParams } from 'react-router-dom';

const IngredienDetails = () => {

  const {id} = useParams()

  const ingredients = useSelector(selectAllIngredients)

  // const currentIngredient =
  console.log(ingredients)
  const currentIngresient = ingredients.length > 0 && ingredients?.filter(el => el._id === id)[0]

  console.log(currentIngresient.image_large)

  return (
    <div className={styles['ingredient-details']}>
      <h2 className='text text_type_main-large mt-30' >Детали ингредиента</h2>
      <img
        className={styles['ingredient-img']}
        src={currentIngresient.image_large}
        alt='ingredient'
      />
      <p
        className={`${styles['ingredient-subtitle']} text text_type_main-medium`}
      >
        {currentIngresient.name}
      </p>
      <div className={styles['nutrition-list']}>
        <NutritionElement title={'Калории,ккал'} value={currentIngresient.calories} />
        <NutritionElement title={'Белки, г'} value={currentIngresient.proteins} />
        <NutritionElement title={'Жиры, г'} value={currentIngresient.fat} />
        <NutritionElement title={'Углеводы, г'} value={currentIngresient.carbohydrates} />
      </div>
    </div>
  );

};

IngredienDetails.propTypes = {
  selectIngredient: ingredientPropTypes
}

export default IngredienDetails;
