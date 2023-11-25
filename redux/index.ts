import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { itemsApi } from './api/itemsApi';
import searchReducer from './features/searchSlice';
import detailReducer from './features/detailSlice';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  [itemsApi.reducerPath]: itemsApi.reducer,
  searchState: searchReducer,
  detailState: detailReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([itemsApi.middleware]),
  });
}

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
