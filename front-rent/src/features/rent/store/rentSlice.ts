import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { fetchMyRentByClientId } from './rentThunks';
import { OrderI } from '../../../types';

interface RentState {
  myRents: OrderI[];
  fetchMyRentLoading: boolean;
}

const initialState: RentState = {
  myRents: [],
  fetchMyRentLoading: false,
};

const rentSlice = createSlice({
  name: 'rents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRentByClientId.pending, (state) => {
        state.fetchMyRentLoading = true;
      })
      .addCase(fetchMyRentByClientId.fulfilled, (state, { payload }) => {
        state.fetchMyRentLoading = false;
        state.myRents = payload;
      })
      .addCase(fetchMyRentByClientId.rejected, (state) => {
        state.fetchMyRentLoading = false;
      });
  },
});

export const rentReducer = rentSlice.reducer;
export const selectMyRents = (state: RootState) => state.rents.myRents;
export const selectRentFetchLoading = (state: RootState) =>
  state.rents.fetchMyRentLoading;
