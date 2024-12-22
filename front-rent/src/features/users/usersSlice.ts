import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { login, register } from './usersThunks';
import { GlobalError, UserI, ValidationError } from '../../types';

interface UsersState {
  user: UserI | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(register.pending, (state) => {
          state.registerLoading = true;
        })
        .addCase(register.fulfilled, (state, { payload }) => {
          state.registerLoading = false;
          state.user = payload.user;
        })
        .addCase(register.rejected, (state, { payload: error }) => {
          state.registerLoading = false;
          state.registerError = error || null;
        });
    builder
        .addCase(login.pending, (state) => {
          state.loginLoading = true;
        })
        .addCase(login.fulfilled, (state, { payload }) => {
          state.loginLoading = false;
          state.user = payload.user;
        })
        .addCase(login.rejected, (state, { payload: error }) => {
          state.loginLoading = false;
          state.loginError = error || null;
        });
  },
});

export const { unsetUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) =>
    state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
    state.users.registerError;
export const selectLoginLoading = (state: RootState) =>
    state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
