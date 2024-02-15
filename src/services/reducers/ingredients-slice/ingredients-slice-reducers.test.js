import {
  ingredientsReducer,
  initialState,
  loadIngredients,
} from './ingredients-slice';

import {data as mockIngredients} from '../../../vendor/data'

describe('ingredientsSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = ingredientsReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });
  it('should change status with "loadIngredients.pending" action', () => {
    const state = ingredientsReducer(initialState, loadIngredients.pending());

    expect(state.status).toBe('loading');
  });
  it('should change status with "loadIngredients.fulfilled" action', () => {
    const state = ingredientsReducer(initialState, loadIngredients.fulfilled({data: mockIngredients}));

    expect(state).toEqual({
      list: mockIngredients,
      status: 'received',
      error: null,
    })
  });
  it('should change status with "loadIngredients.rejected" action', () => {
    const state = ingredientsReducer(initialState, loadIngredients.rejected());

    expect(state.status).toBe('rejected');
  });
});
