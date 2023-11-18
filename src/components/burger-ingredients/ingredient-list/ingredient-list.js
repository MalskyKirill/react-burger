import IngredientElement from '../ingredient-element/ingredient-element';
import stiles from './ingredient-list.module.css';

const IngredientList = ({ title, data }) => {

  return (
    <>
      <h2>{title}</h2>
      <ul className={stiles['ingredient-list']}>
        {data.map((el) => (
          <IngredientElement name={el.name} key={el._id} image={el.image} price={el.price}/>
        ))}
      </ul>
    </>
  );
};

export default IngredientList;
