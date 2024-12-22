import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import {
  createCategory,
  deleteCategory,
  editCategory,
  fetchCategory,
  fetchCategoryByMainCategory,
  fetchOneCategory,
} from './categoryThunks';
import { CategoryByMainCategoryId, CategoryI } from '../../../types';

interface CategoryState {
  category: CategoryI[];
  categoryById: CategoryByMainCategoryId[];
  oneCategory: CategoryI | null;
  createLoading: boolean;
  fetchLoading: boolean;
  fetchCategoryByIdLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
}

const initialState: CategoryState = {
  category: [],
  categoryById: [],
  oneCategory: null,
  createLoading: false,
  fetchLoading: false,
  fetchCategoryByIdLoading: false,
  editLoading: false,
  deleteLoading: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.category = payload;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createCategory.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(fetchOneCategory.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchOneCategory.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.oneCategory = payload;
      })
      .addCase(fetchOneCategory.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(editCategory.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.editLoading = false;
      })
      .addCase(editCategory.rejected, (state) => {
        state.editLoading = false;
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(fetchCategoryByMainCategory.pending, (state) => {
        state.fetchCategoryByIdLoading = true;
      })
      .addCase(fetchCategoryByMainCategory.fulfilled, (state, { payload }) => {
        state.fetchCategoryByIdLoading = false;
        state.categoryById = payload;
      })
      .addCase(fetchCategoryByMainCategory.rejected, (state) => {
        state.fetchCategoryByIdLoading = false;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
export const selectCategory = (state: RootState) => state.category.category;
export const selectOneCategory = (state: RootState) =>
  state.category.oneCategory;
export const selectCategoryFetchLoading = (state: RootState) =>
  state.category.fetchLoading;
export const selectCategoryCreateLoading = (state: RootState) =>
  state.category.createLoading;
export const selectCategoryEditLoading = (state: RootState) =>
  state.category.editLoading;
export const selectCategoryDeleteLoading = (state: RootState) =>
  state.category.deleteLoading;

export const selectCategoryById = (state: RootState) =>
  state.category.categoryById;
export const selectCategoryFetchByIdLoading = (state: RootState) =>
  state.category.fetchCategoryByIdLoading;
