import { getOrderNumber, getCurrentOrder } from './order-slice';

global.fetch = jest.fn();

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

const ingredients = [
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
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      __v: 0,
    },
  },
];

const order = [
  {
    createdAt: '2024-01-29T14:34:09.283Z',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d',
    ],
    name: 'Флюоресцентный space бургер',
    number: 666,
    status: 'done',
    updatedAt: '2024-01-29T14:34:09.795Z',
    _id: '1',
  },
]

describe('getOrderNumber', () => {
  it('should getOrderNumber with resolved responce', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ order: { number: 666 } }),
    });

    const dispatch = jest.fn();

    const thunk = getOrderNumber({ ingredients, bun, accessToken: 'accessToken' });

    await thunk(dispatch);

    const { calls } = dispatch.mock;

    const [start, end] = calls;

    expect(start[0].type).toBe(getOrderNumber.pending().type);
    expect(end[0].type).toBe(getOrderNumber.fulfilled().type);
    expect(end[0].payload.order.number).toBe(666);
  });

  it('should getOrderNumber with resolved rejected', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();

    const thunk = getOrderNumber({ ingredients, bun, accessToken: 'accessToken' });

    await thunk(dispatch);

    const { calls } = dispatch.mock;

    const [start, end] = calls;

    expect(start[0].type).toBe(getOrderNumber.pending().type);
    expect(end[0].type).toBe(getOrderNumber.rejected().type);
  })
});

describe('getCurrentOrder', () => {
  it('should getCurrentOrder with resolved responce', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          orders: order,
        }),
    });

    const dispatch = jest.fn();

    const thunk = getCurrentOrder(666);

    await thunk(dispatch);

    const { calls } = dispatch.mock;

    const [start, end] = calls;

    expect(start[0].type).toBe(getCurrentOrder.pending().type);
    expect(end[0].type).toBe(getCurrentOrder.fulfilled().type);
    expect(end[0].payload.orders[0]).toEqual(order[0]);
  });

  it('should getCurrentOrder with resolved rejected', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();

    const thunk = getCurrentOrder(666);

    await thunk(dispatch);

    const { calls } = dispatch.mock;

    const [start, end] = calls;

    expect(start[0].type).toBe(getCurrentOrder.pending().type);
    expect(end[0].type).toBe(getCurrentOrder.rejected().type);
  })
});
