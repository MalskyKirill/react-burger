import styles from './nutrition-element.module.css';

const NutritionElement = ({title, value}) => {
  return (
    <div className={styles['nutrition-element']}>
      <p
        className={`${styles['nutrition-tytle']} text text_type_main-default text_color_inactive`}
      >
        {title}
      </p>
      <p
        className={`${styles['nutrition-value']} text text_type_digits-default text_color_inactive`}
      >
        {value}
      </p>
    </div>
  );
};

export default NutritionElement;
