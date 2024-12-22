import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import {
  createMainCategory,
  deleteMainCategory,
  editMainCategory,
  fetchMainCategory,
  fetchOneMainCategory,
} from './mainCategoryThunks';
import { MainCategoryI } from '../../../types';

interface MainCategoryState {
  mainCategory: MainCategoryI[];
  oneMainCategory: MainCategoryI | null;
  createLoading: boolean;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
}

const initialState: MainCategoryState = {
  mainCategory: [],
  oneMainCategory: null,
  createLoading: false,
  fetchLoading: false,
  fetchOneLoading: false,
  editLoading: false,
  deleteLoading: false,
};

export const mainCategorySlice = createSlice({
  name: 'mainCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainCategory.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchMainCategory.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.mainCategory = payload;
      })
      .addCase(fetchMainCategory.rejected, (state) => {
        state.fetchLoading = false;
      });
    builder
      .addCase(createMainCategory.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createMainCategory.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createMainCategory.rejected, (state) => {
        state.createLoading = false;
      });
    builder
      .addCase(editMainCategory.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(editMainCategory.fulfilled, (state) => {
        state.editLoading = false;
      })
      .addCase(editMainCategory.rejected, (state) => {
        state.editLoading = false;
      });
    builder
      .addCase(deleteMainCategory.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteMainCategory.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteMainCategory.rejected, (state) => {
        state.deleteLoading = false;
      });
    builder
      .addCase(fetchOneMainCategory.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneMainCategory.fulfilled, (state, { payload }) => {
        state.fetchOneLoading = false;
        state.oneMainCategory = payload;
      })
      .addCase(fetchOneMainCategory.rejected, (state) => {
        state.fetchOneLoading = false;
      });
  },
});

export const mainCategoryReducer = mainCategorySlice.reducer;
export const selectMainCategories = (state: RootState) =>
  state.mainCategory.mainCategory;
export const selectOneMainCategory = (state: RootState) =>
  state.mainCategory.oneMainCategory;
export const selectMainCategoryFetchLoading = (state: RootState) =>
  state.mainCategory.fetchLoading;
export const selectMainCategoryOneFetchLoading = (state: RootState) =>
  state.mainCategory.fetchOneLoading;
export const selectMainCategoryCreateLoading = (state: RootState) =>
  state.mainCategory.createLoading;
export const selectMainCategoryEditLoading = (state: RootState) =>
  state.mainCategory.editLoading;
export const selectMainCategoryDeleteLoading = (state: RootState) =>
  state.mainCategory.deleteLoading;
