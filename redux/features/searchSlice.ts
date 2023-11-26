import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE } from '../../config';
import { fetchCountItems } from '../../api/search-helper';

export interface ISearchState {
  loading: boolean;
  error: string | null;
  perPage: number;
  page: number;
  countItems: number;
  searchTerm: string;
  details: number;
}

export const getCountItems = createAsyncThunk(
  'getCountItems',
  (searchTerm: string) => {
    return fetchCountItems(searchTerm);
  }
);

const initialState: ISearchState = {
  loading: false,
  error: null,
  countItems: 0,
  perPage: DEFAULT_PER_PAGE,
  page: DEFAULT_PAGE_NUMBER,
  searchTerm: '',
  details: 0,
};

export const searchSlice = createSlice({
  initialState,
  name: 'searchSlice',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setDetails: (state, action: PayloadAction<number>) => {
      state.details = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountItems.fulfilled, (state, action) => {
      state.countItems = action.payload;
    });
  },
});

export default searchSlice.reducer;

export const {
  setLoading,
  setError,
  setSearchTerm,
  setPerPage,
  setDetails,
  setPage,
} = searchSlice.actions;
