import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../model/response.interface';
import { DEFAULT_PER_PAGE } from '../../config';

interface ISearchState {
  loading: boolean;
  error: string | null;
  items: IItem[];
  perPage: number;
  searchTerm: string;
}

const initialState: ISearchState = {
  loading: false,
  error: null,
  items: [] as IItem[],
  perPage: DEFAULT_PER_PAGE,
  searchTerm: localStorage.get('searchTerm') ?? '',
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
    setItems: (state, action: PayloadAction<IItem[]>) => {
      state.items = action.payload;
    },
  },
});

export default searchSlice.reducer;

export const { setLoading, setError, setItems } = searchSlice.actions;
