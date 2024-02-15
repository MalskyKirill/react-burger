import {
  detailsReducer,
  addDataDetails,
  removeModalData,
  initialState,
} from './details-slice';

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

const modalData = {
  name: ingredient.name,
  img: ingredient.image_large,
  calories: ingredient.calories,
  carbohydrates: ingredient.carbohydrates,
  fat: ingredient.fat,
  proteins: ingredient.proteins,
  isModalOpen: true,
}

describe('detailsSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = detailsReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('should add details with "addDataDetails" action', () => {
    const action = {
      type: addDataDetails.type,
      payload: modalData,
    };

    const result = detailsReducer(initialState, action);

    expect(result).toEqual(modalData);
  });

  it('should clean filled state with "removeModalData" action', () => {
    const action = {
      type: removeModalData.type,
    }

    const result = detailsReducer(modalData, action)

    expect(result).toEqual(initialState)
  })
});

