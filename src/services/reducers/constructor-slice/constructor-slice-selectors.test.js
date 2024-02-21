import {
  selectConstructorElements,
  selectConstructorBun,
  selectConstructorIngredients,
} from './constructor-slice';

describe('redux selectors', () => {
  it('should select burgerConstructor from state object', () => {
    const burgerConstructor = {
      bun: {
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
      },
      ingredients: [
        {
          id: '322bf6ac-611a-4d1d-b8a0-1e1893545c4b',
          ingredient: {
            _id: '60666c42cc7b410027a1a9b5',
            name: 'Говяжий метеорит (отбивная)',
            type: 'main',
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: 'https://code.s3.yandex.net/react/code/meat-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-04-large.png',
            __v: 0,
          },
        },
      ],
    };

    const result = selectConstructorElements({ burgerConstructor });

    expect(result).toEqual(burgerConstructor);
  });

  it('should select burgerBun from state object', () => {
    const burgerBun = {
      bun: {
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
      },
    };

    const result = selectConstructorBun({ burgerConstructor: burgerBun });

    expect(result).toEqual(burgerBun.bun);
  });

  it('should select burgerIngredients from state object', () => {
    const burgerIngredients = {
      ingredients: [
        {
          id: '322bf6ac-611a-4d1d-b8a0-1e1893545c4b',
          ingredient: {
            _id: '60666c42cc7b410027a1a9b5',
            name: 'Говяжий метеорит (отбивная)',
            type: 'main',
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: 'https://code.s3.yandex.net/react/code/meat-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-04-large.png',
            __v: 0,
          },
        },
      ],
    };

    const result = selectConstructorIngredients({burgerConstructor: burgerIngredients})

    expect(result).toEqual(burgerIngredients.ingredients)
  });
});
