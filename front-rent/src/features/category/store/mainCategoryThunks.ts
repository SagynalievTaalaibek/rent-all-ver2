import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { MainCategoryI } from '../../../types';

export const fetchMainCategory = createAsyncThunk<MainCategoryI[]>(
  'mainCategory/fetchAll',
  async () => {
    const response = await axiosApi.get<MainCategoryI[]>('/main_category');
    return response.data;
  },
);

export const createMainCategory = createAsyncThunk<void, string>(
  'mainCategory/create',
  async (mainCategory) => {
    await axiosApi.post('/main_category', { mainCategoryName: mainCategory });
  },
);

export const editMainCategory = createAsyncThunk<void, MainCategoryI>(
  'mainCategory/edit',
  async (mainCategory) => {
    await axiosApi.put(`/main_category/${mainCategory._id}`, mainCategory);
  },
);

export const deleteMainCategory = createAsyncThunk<void, string>(
  'mainCategory/delete',
  async (id) => {
    await axiosApi.delete(`/main_category/${id}`);
  },
);

export const fetchOneMainCategory = createAsyncThunk<MainCategoryI, string>(
  'mainCategory/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`/main_category/${id}`);
    return response.data;
  },
);
