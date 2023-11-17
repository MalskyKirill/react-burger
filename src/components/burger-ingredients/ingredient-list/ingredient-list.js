import IngredientElement from '../ingredient-element/ingredient-element';
import stiles from './ingredient-list.module.css';

const IngredientList = ({ title, data }) => {

  return (
    <>
      <h2>{title}</h2>
      <ul className={stiles['ingredient-list']}>
        {data.map((el, index) => (
          <IngredientElement name={el.name} key={index} image={el.image} price={el.price}/>
        ))}
      </ul>
    </>
  );
};

export default IngredientList;
