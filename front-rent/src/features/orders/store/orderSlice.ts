import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { createOrder, fetchOrderByOwnerId } from './orderThunks';
import { OrderI } from '../../../types';

interface OrderState {
  orders: OrderI[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: OrderState = {
  orders: [],
  fetchLoading: false,
  createLoading: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(fetchOrderByOwnerId.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchOrderByOwnerId.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.orders = payload;
      })
      .addCase(fetchOrderByOwnerId.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrderCreateLoading = (state: RootState) =>
  state.orders.createLoading;
export const selectOrderFetchAllLoading = (state: RootState) =>
  state.orders.fetchLoading;
