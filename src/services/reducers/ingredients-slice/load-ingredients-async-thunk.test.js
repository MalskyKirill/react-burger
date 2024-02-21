import { loadIngredients } from './ingredients-slice';

import { data as mockIngredients } from '../../../vendor/data';

global.fetch = jest.fn();

describe('loadIngredients', () => {
  it('should loadIngredients with resolved responce', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIngredients),
    });

    const dispatch = jest.fn();

    const thunk = loadIngredients();

    await thunk(dispatch);

    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(loadIngredients.pending().type);
    expect(end[0].type).toBe(loadIngredients.fulfilled().type);
    expect(end[0].payload).toBe(mockIngredients);
  });

  it('should loadIngredients with rejected responce', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();

    const thunk = loadIngredients();

    await thunk(dispatch);

    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(loadIngredients.pending().type);
    expect(end[0].type).toBe(loadIngredients.rejected().type);
    expect(end[0].meta.requestStatus).toBe('rejected');
  })
});
