import styles from './ingredient-details.module.css';
import NutritionElement from './nutrition-element/nutrition-element';
import { useSelector } from 'react-redux';
import { selectAllIngredients } from '../../services/reducers/ingredients-slice/ingredients-slice';
import { useLocation, useParams } from 'react-router-dom';
import { IIngredient } from '../../types/ingredient';

const IngredienDetails = (): JSX.Element => {

  const { id } = useParams();

  const location = useLocation()

  const ingredients: Array<IIngredient> = useSelector(selectAllIngredients);

  const currentIngresient =
    ingredients.length > 0 && ingredients?.filter((el) => el._id === id)[0];

  if (!currentIngresient) return <h2>Ингредиент не найден</h2>

  return (
    <div className={styles['ingredient-details']}>
      {!location.state && <h2 className='text text_type_main-large mt-30'>Детали ингредиента</h2>}
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
        <NutritionElement
          title={'Калории,ккал'}
          value={currentIngresient.calories}
        />
        <NutritionElement
          title={'Белки, г'}
          value={currentIngresient.proteins}
        />
        <NutritionElement title={'Жиры, г'} value={currentIngresient.fat} />
        <NutritionElement
          title={'Углеводы, г'}
          value={currentIngresient.carbohydrates}
        />
      </div>
    </div>
  );
};

export default IngredienDetails;
