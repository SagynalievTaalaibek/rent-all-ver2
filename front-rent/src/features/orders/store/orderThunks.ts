import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderI, OrdersMutation } from '../../../types';
import axiosApi from '../../../axiosApi';

export const createOrder = createAsyncThunk<void, OrdersMutation>(
  'order/create',
  async (order) => {
    await axiosApi.post('/orders', order);
  },
);

export const fetchOrderByOwnerId = createAsyncThunk<OrderI[], string>(
  'order/fetchByOwnerId',
  async (id) => {
    const response = await axiosApi.get(`/orders/?ownerId=${id}`);
    return response.data;
  },
);

export const clientPayed = createAsyncThunk<void, string>(
  'order/payed',
  async (id) => {
    await axiosApi.patch(`/orders/${id}/payed`);
  },
);

export const clientCancel = createAsyncThunk<void, string>(
  'order/cancel',
  async (id) => {
    await axiosApi.patch(`/orders/${id}/cancel`);
  },
);

export const clientCompleted = createAsyncThunk<void, string>(
  'order/completed',
  async (id) => {
    await axiosApi.patch(`/orders/${id}/complete`);
  },
);
