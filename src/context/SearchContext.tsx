import { createContext, useState } from 'react';
import { IItem } from '../model/response.interface';

export interface ISearchContext {
  countItems: number;
  currentSearchTerm: string;
  items: IItem[];
  setCountItems: (countPages: number) => void;
  setCurrentSearchTerm: (currentSearchTerm: string) => void;
  setItems: (items: IItem[]) => void;
}

export const SearchContext = createContext<ISearchContext>({
  countItems: 0,
  currentSearchTerm: '',
  items: [],
  setCountItems: () => {
    /**/
  },
  setCurrentSearchTerm: () => {
    /**/
  },
  setItems: () => {
    /**/
  },
});

export const SearchState = ({ children }: { children: React.ReactNode }) => {
  const defaultSearchTerm = localStorage.getItem('searchTerm') ?? '';
  const [countItems, setCountItems] = useState(0);
  const [currentSearchTerm, setCurrentSearchTerm] = useState(defaultSearchTerm);
  const [items, setItems] = useState([] as IItem[]);

  return (
    <SearchContext.Provider
      value={{
        countItems,
        setCountItems,
        currentSearchTerm,
        setCurrentSearchTerm,
        items,
        setItems,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
