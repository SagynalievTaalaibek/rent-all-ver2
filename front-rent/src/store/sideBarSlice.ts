import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface SideBarState {
  open: boolean;
}

const initialState: SideBarState = {
  open: false,
};

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    closeSideBar(state) {
      state.open = false;
    },
    openSideBar(state) {
      state.open = true;
    },
    toggleSideBar(state) {
      state.open = !state.open;
    },
  },
});

export const sideBarReducer = sideBarSlice.reducer;
export const { openSideBar, closeSideBar, toggleSideBar } =
  sideBarSlice.actions;
export const selectIsOpen = (state: RootState) => state.sideBar.open;
