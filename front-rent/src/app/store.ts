import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersReducer } from '../features/users/usersSlice';
import { mainCategoryReducer } from '../features/category/store/mainCategorySlice';
import { categoryReducer } from '../features/category/store/categorySlice';
import { sideBarReducer } from '../store/sideBarSlice';
import { itemReducer } from '../features/item/store/itemSlice';
import { orderReducer } from '../features/orders/store/orderSlice';
import { rentReducer } from '../features/rent/store/rentSlice';

const usersPersistConfig = {
  key: 'rent:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  mainCategory: mainCategoryReducer,
  category: categoryReducer,
  sideBar: sideBarReducer,
  items: itemReducer,
  orders: orderReducer,
  rents: rentReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
