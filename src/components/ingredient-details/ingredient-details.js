import styles from './ingredient-details.module.css';
import NutritionElement from './nutrition-element/nutrition-element';



const IngredienDetails = () => {

  const nutritionMap = ['Калории,ккал', 'Белки, г', 'Жиры, г', 'Углеводы, г']

  return (
    <div className={styles['ingredient-details']}>
      <img className={styles['ingredient-img']} src="https://code.s3.yandex.net/react/code/meat-01-large.png" alt='катлета'/>
      <p className={`${styles['ingredient-subtitle']} text text_type_main-medium`}>Биокотлета из марсианской Магнолии</p>
      <div className={styles['nutrition-list']}>
        {nutritionMap.map((el, i) => <NutritionElement title={el} key={i}/>)}
      </div>
    </div>
  );
}

export default IngredienDetails;
