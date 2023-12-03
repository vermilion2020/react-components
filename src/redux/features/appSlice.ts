import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { countries } from '../countries';
import { IAppState, IFormData } from '../../model/state.interface';

const initialState: IAppState = {
  countries: countries,
  forms: [] as IFormData[]
};

export const AppSlice = createSlice({
  initialState,
  name: 'appSlice',
  reducers: {
    addForm: (state, action: PayloadAction<IFormData>) => {

      state.forms = [action.payload, ...state.forms];
    },
  }
});

export default AppSlice.reducer;

export const { addForm } =
AppSlice.actions; 
