import {
  constructorReducer,
  addBun,
  addIngredients,
  deleteIngredient,
  removeConstructorData,
  swapIngredients,
  initialState,
} from './constructor-slice';

import { v4 as uuidv4 } from 'uuid';

const bun = {
  _id: '60666c42cc7b410027a1a9b1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

const ingredient = {
  _id: '60666c42cc7b410027a1a9b5',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  __v: 0,
};

const anotherIngredient = {
  _id: '60666c42cc7b410027a1a9b7',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
};

const ingredientId = uuidv4();

const anotherIngredientId = uuidv4();

const ingredientsState = {
  bun,
  ingredients: [
    { ingredient, id: ingredientId },
    { anotherIngredient, id: anotherIngredientId },
  ],
};

describe('constructorSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = constructorReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('should add bun with "addBun" action', () => {
    const action = { type: addBun.type, payload: bun };

    const result = constructorReducer(initialState, action);

    expect(result.bun).toBe(bun);
  });

  it('shold add ingredient with "addIngredients" action', () => {
    const action = {
      type: addIngredients.type,
      payload: { ingredient, id: ingredientId },
    };

    const result = constructorReducer(initialState, action);

    expect(result.ingredients).toEqual([{ ingredient, id: ingredientId }]);
  });

  it('should swap ingredients with "swapIngredients" actions', () => {
    const action = {
      type: swapIngredients.type,
      payload: { fromIndex: 0, toIndex: 1 },
    };

    const result = constructorReducer(ingredientsState, action);

    expect(result.ingredients).toEqual([
      { anotherIngredient, id: anotherIngredientId },
      { ingredient, id: ingredientId },
    ]);
  });

  it('should remove ingredient by id with "deleteIngredient" action', () => {
    const action = {
      type: deleteIngredient.type,
      payload: ingredientId
    }

    const result = constructorReducer(ingredientsState, action);

    expect(result.ingredients).toEqual([{ anotherIngredient, id: anotherIngredientId }])
  })

  it('should clean filled state with "removeConstructorData" action', () => {
    const action = {
      type: removeConstructorData.type,
    }

    const result = constructorReducer(ingredientsState, action)

    expect(result).toEqual(initialState)
  })
});
