import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../model/response.interface';

interface IDetailState {
  loading: boolean;
  error: string | null;
  item: IItem | null;
}

const initialState: IDetailState = {
  loading: false,
  error: null,
  item: null,
};

export const detailSlice = createSlice({
  initialState,
  name: 'detailSlice',
  reducers: {
    setItem: (state, action: PayloadAction<IItem | null>) => {
      state.item = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export default detailSlice.reducer;

export const { setLoading, setError, setItem } = detailSlice.actions;
