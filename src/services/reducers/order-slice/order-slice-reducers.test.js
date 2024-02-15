import {orderReducer, initialState, getCurrentOrder, getOrderNumber} from './order-slice';

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

describe('orderSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = orderReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('should change status with "getOrderNumber.pending" action', () => {
    const state = orderReducer(initialState, getOrderNumber.pending());

    expect(state.status).toBe('loading');
  });
  it('should change status with "getOrderNumber.fulfilled" action', () => {
    const state = orderReducer(initialState, getOrderNumber.fulfilled({order: { number: 666}, success: true}));

    expect(state).toEqual({
      order: null,
      orderNumber: 666,
      status: 'received',
      error: null,
      isModalOpen: true,
    })
  });
  it('should change status with "getOrderNumber.rejected" action', () => {
    const state = orderReducer(initialState, getOrderNumber.rejected());

    expect(state.status).toBe('rejected');
  });

  it('should change status with "getCurrentOrder.pending" action', () => {
    const state = orderReducer(initialState, getCurrentOrder.pending());

    expect(state.status).toBe('loading');
  });
  it('should change status with "getCurrentOrder.fulfilled" action', () => {
    const state = orderReducer(initialState, getCurrentOrder.fulfilled({orders: order}));

    expect(state).toEqual({
      order: order[0],
      status: 'received',
      error: null,
      isModalOpen: false,
      orderNumber: null,
    })
  });
  it('should change status with "getCurrentOrder.rejected" action', () => {
    const state = orderReducer(initialState, getCurrentOrder.rejected());

    expect(state.status).toBe('rejected');
  });
})
