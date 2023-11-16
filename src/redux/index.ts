import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { itemsApi } from './api/itemsApi';
import searchReducer from './features/searchSlice';
import detailReducer from './features/detailSlice';

export const store = configureStore({
  reducer: {
    [itemsApi.reducerPath]: itemsApi.reducer,
    searchState: searchReducer,
    detailState: detailReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([itemsApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
