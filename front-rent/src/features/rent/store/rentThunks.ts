import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { OrderI } from '../../../types';

export const fetchMyRentByClientId = createAsyncThunk<OrderI[], string>(
  'rent/fetchByOwnerId',
  async (id) => {
    const response = await axiosApi.get(`/orders/?clientId=${id}`);
    return response.data;
  },
);
