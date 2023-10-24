export interface IItem {
  name: string;
  value: string;
}

export interface IItemProps {
  item: IItem;
}

export interface IState {
  items: IItem[];
  searchTerm: '';
}
