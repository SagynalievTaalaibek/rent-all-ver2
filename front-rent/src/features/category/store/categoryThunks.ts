import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { RootState } from '../../../app/store';
import {
  CategoryByMainCategoryId,
  CategoryI,
  CategoryMutation,
  CategoryUpdate,
} from '../../../types';

export const fetchCategory = createAsyncThunk<CategoryI[]>(
  'category/fetch',
  async () => {
    const response = await axiosApi.get<CategoryI[]>('/category');
    return response.data;
  },
);

export const fetchOneCategory = createAsyncThunk<CategoryI, string>(
  'category/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`/category/${id}`);
    return response.data;
  },
);

export const createCategory = createAsyncThunk<void, CategoryMutation>(
  'category/create',
  async (category) => {
    await axiosApi.post('/category', category);
  },
);

export const editCategory = createAsyncThunk<void, CategoryUpdate>(
  'category/edit',
  async (category) => {
    await axiosApi.put(`/category/${category._id}`, category);
  },
);

export const deleteCategory = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('category/delete', async (id, { dispatch }) => {
  await axiosApi.delete(`/category/${id}`);
  await dispatch(fetchCategory());
});

export const fetchCategoryByMainCategory = createAsyncThunk<
  CategoryByMainCategoryId[],
  string
>('category/fetchByMainCategory', async (id) => {
  const response = await axiosApi.get(`/category?mainCategory=${id}`);
  return response.data;
});
