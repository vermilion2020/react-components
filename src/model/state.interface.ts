import { IItem } from './response.interface';

export interface IItemProps {
  item: IItem;
}

export interface IState {
  error: string;
  isLoading: boolean;
  items: IItem[];
  pageSize: number;
  pageNumber: number;
  searchTerm: string;
}
