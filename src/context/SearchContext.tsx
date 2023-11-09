import { createContext, useState } from 'react';
import { IItem } from '../model/response.interface';

interface ISearchContext {
  countItems: number;
  lastSearchTerm: string;
  opened: boolean;
  items: IItem[];
  setCountItems: (countPages: number) => void;
  setLastSearchTerm: (lastSearchTerm: string) => void;
  setOpened: (opened: boolean) => void;
  setItems: (items: IItem[]) => void;
}

export const SearchContext = createContext<ISearchContext>({
  countItems: 0,
  lastSearchTerm: '',
  opened: false,
  items: [],
  setCountItems: () => {
    /**/
  },
  setLastSearchTerm: () => {
    /**/
  },
  setOpened: () => {
    /**/
  },
  setItems: () => {
    /**/
  },
});

export const SearchState = ({ children }: { children: React.ReactNode }) => {
  const defaultSearchTerm = localStorage.getItem('searchTerm') ?? '';
  const [countItems, setCountItems] = useState(0);
  const [lastSearchTerm, setLastSearchTerm] = useState(defaultSearchTerm);
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState([] as IItem[]);

  return (
    <SearchContext.Provider
      value={{
        countItems,
        setCountItems,
        lastSearchTerm,
        setLastSearchTerm,
        opened,
        setOpened,
        items,
        setItems,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
