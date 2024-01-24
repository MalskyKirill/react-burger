import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IIngredient } from '../../types/ingredient';
import { api } from '../../utils/api';

export const getOrderNumber = createAsyncThunk(
  '@@order/getOrderNumber',
  async ({bun, ingredients, token} : {bun: IIngredient, ingredients: Array<IIngredient>, token: string}) => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        ingredients: [bun._id, ...ingredients, bun._id]
      }),
    }

    const res = await api.addOrder(request);
    return res;
  }
);

type TInitialState = {
  orderNumber: number | null,
  status: string,
  error: string | null,
  isModalOpen: boolean,
}

const initialState: TInitialState = {
  orderNumber: null,
  status: 'idle',
  error: null,
  isModalOpen: false,
};

const orderSlice = createSlice({
  name: '@@order',
  initialState,
  reducers: {
    removeModalOrderData: (state, action) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderNumber.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getOrderNumber.fulfilled, (state, action) => {
        state.status = 'received';
        state.orderNumber = action.payload.order.number;
        state.isModalOpen = action.payload.success
      })
      .addCase(getOrderNumber.rejected, (state, action) => {
        state.status = 'rejected';
        if(action.error.message) state.error = action.error.message;
      });
  },
});

export const {removeModalOrderData} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;

// selectors
export const orderStatus = (state: { order: { status: string; }; }) => state.order.status
export const orderNumber = (state: { order: { orderNumber: number | null; }; }) => state.order.orderNumber
export const selectIsModalOrderOpen = (state: { order: { isModalOpen: boolean; }; }) => state.order.isModalOpen;
