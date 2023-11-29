import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchState {
  loading: boolean;
  error: string | null;
  perPage: number;
  countItems: number;
  searchTerm: string;
  details: number;
}

const defaultSearchTerm = localStorage.getItem('searchTerm') ?? '';

const initialState: ISearchState = {
  loading: false,
  error: null,
  countItems: 0,
  perPage: 0,
  searchTerm: defaultSearchTerm,
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
    setDetails: (state, action: PayloadAction<number>) => {
      state.details = action.payload;
    },
  }
});

export default searchSlice.reducer;

export const { setLoading, setError, setSearchTerm, setPerPage, setDetails } =
  searchSlice.actions;
