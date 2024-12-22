import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { ItemsI } from '../../../types';
import {
  createItem,
  deleteItem,
  editItem,
  fetchAllAvailableItem,
  fetchAllItem,
  fetchByCategory,
  fetchByMainCategory,
  fetchByUserId,
  fetchOneItem,
} from './itemThunks';

interface ItemState {
  items: ItemsI[];
  oneItem: ItemsI | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
}

const initialState: ItemState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  deleteLoading: false,
  editLoading: false,
};

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createItem.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createItem.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createItem.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(fetchAllAvailableItem.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAllAvailableItem.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchAllAvailableItem.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchByMainCategory.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchByMainCategory.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchByMainCategory.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchByCategory.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchByCategory.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchByCategory.rejected, (state) => {
        state.fetchLoading = false;
      });
    builder
      .addCase(fetchByUserId.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchByUserId.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchByUserId.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchAllItem.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAllItem.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchAllItem.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchOneItem.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneItem.fulfilled, (state, { payload }) => {
        state.fetchOneLoading = false;
        state.oneItem = payload;
      })
      .addCase(fetchOneItem.rejected, (state) => {
        state.fetchOneLoading = false;
      });
    builder
      .addCase(deleteItem.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteItem.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(editItem.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(editItem.fulfilled, (state) => {
        state.editLoading = false;
      })
      .addCase(editItem.rejected, (state) => {
        state.editLoading = false;
      });
  },
});

export const itemReducer = itemSlice.reducer;
export const selectItems = (state: RootState) => state.items.items;
export const selectOneItem = (state: RootState) => state.items.oneItem;

export const selectItemFetchAllLoading = (state: RootState) =>
  state.items.fetchLoading;
export const selectItemFetchOneLoading = (state: RootState) =>
  state.items.fetchOneLoading;
export const selectCreateItemLoading = (state: RootState) =>
  state.items.createLoading;
export const selectEditItemLoading = (state: RootState) =>
  state.items.editLoading;
export const selectDeleteItemLoading = (state: RootState) =>
  state.items.deleteLoading;
