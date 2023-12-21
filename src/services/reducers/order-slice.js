import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const getOrderNumber = createAsyncThunk(
  '@@order/getOrderNumber',
  async ({bun, ingredients}) => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: [bun._id, ...ingredients, bun._id]
      }),
    }

    const res = await api.addOrder(request);
    return res;
  }
);

const initialState = {
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
        console.log(action.payload)
        state.orderNumber = action.payload.order.number;
        state.isModalOpen = action.payload.success
      })
      .addCase(getOrderNumber.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const {removeModalOrderData} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;

// selectors
export const orderNumber = (state) => state.order.orderNumber
export const selectIsModalOrderOpen = (state) => state.order.isModalOpen;
