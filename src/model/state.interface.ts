import { IEpisode } from './response.interface';

export interface IItemProps {
  item: IEpisode;
}

export interface IState {
  error: string;
  isLoading: boolean;
  items: IEpisode[];
  searchTerm: string;
}
