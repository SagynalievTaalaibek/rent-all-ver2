import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { ItemMutation, ItemsI } from '../../../types';

export const createItem = createAsyncThunk<void, ItemMutation>(
  'item/create',
  async (item) => {
    await axiosApi.post('/items', item);
  },
);

export const fetchAllAvailableItem = createAsyncThunk<ItemsI[]>(
  'item/fetchAllAvailable',
  async () => {
    const response = await axiosApi.get<ItemsI[]>('/items/?available=true');
    return response.data;
  },
);

export const fetchByMainCategory = createAsyncThunk<ItemsI[], string>(
  'item/fetchByMainCategory',
  async (categoryId) => {
    const response = await axiosApi.get<ItemsI[]>(
      `/items/?mainCategory=${categoryId}`,
    );

    return response.data;
  },
);

export const fetchByCategory = createAsyncThunk<ItemsI[], string>(
  'item/fetchByCategory',
  async (categoryId) => {
    const response = await axiosApi.get<ItemsI[]>(
      `/items/?category=${categoryId}`,
    );

    return response.data;
  },
);

export const fetchByUserId = createAsyncThunk<ItemsI[], string>(
  'item/fetchByUserId',
  async (userId) => {
    const response = await axiosApi.get<ItemsI[]>(`/items/?user=${userId}`);

    return response.data;
  },
);

export const fetchAllItem = createAsyncThunk<ItemsI[]>(
  'item/fetchAll',
  async () => {
    const response = await axiosApi.get<ItemsI[]>('/items');
    return response.data;
  },
);

export const fetchOneItem = createAsyncThunk<ItemsI, string>(
  'item/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`/items/${id}`);
    return response.data;
  },
);

interface ItemPut {
  item: ItemMutation;
  id: string;
}

export const editItem = createAsyncThunk<void, ItemPut>(
  'item/edit',
  async ({ item, id }) => {
    await axiosApi.put(`/items/${id}`, item);
  },
);

export const deleteItem = createAsyncThunk<void, string>(
  'item/delete',
  async (id) => {
    await axiosApi.delete(`/items/${id}`);
  },
);

export const toggleAvailable = createAsyncThunk<void, string>(
  'item/toggleAvailable',
  async (id) => {
    await axiosApi.patch(`/items/${id}/availability`);
  },
);
