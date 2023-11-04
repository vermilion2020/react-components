import { createContext, useState } from 'react';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE } from '../axios-config';

interface ISearchContext {
  currentPage: number;
  countItems: number;
  itemsPerPage: number;
  currentItemId: number;
  lastSearchTerm: string;
  opened: boolean;
  setCurrentPage: (currentPage: number) => void;
  setCountItems: (countPages: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  setLastSearchTerm: (lastSearchTerm: string) => void;
  setCurrentItemId: (currentItemId: number) => void;
  setOpened: (opened: boolean) => void;
}

export const SearchContext = createContext<ISearchContext>({
  currentPage: DEFAULT_PAGE_NUMBER,
  countItems: 0,
  itemsPerPage: DEFAULT_PER_PAGE,
  lastSearchTerm: '',
  currentItemId: 0,
  opened: false,
  setCurrentPage: () => {
    /**/
  },
  setCountItems: () => {
    /**/
  },
  setItemsPerPage: () => {
    /**/
  },
  setLastSearchTerm: () => {
    /**/
  },
  setCurrentItemId: () => {
    /**/
  },
  setOpened: () => {
    /**/
  },
});

export const SearchState = ({ children }: { children: React.ReactNode }) => {
  const defaultSearchTerm = localStorage.getItem('searchTerm') ?? '';
  const defaultPerPage = +(localStorage.getItem('perPage') ?? DEFAULT_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [countItems, setCountItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(defaultPerPage);
  const [currentItemId, setCurrentItemId] = useState(0);
  const [lastSearchTerm, setLastSearchTerm] = useState(defaultSearchTerm);
  const [opened, setOpened] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        countItems,
        setCountItems,
        itemsPerPage,
        setItemsPerPage,
        currentItemId,
        setCurrentItemId,
        lastSearchTerm,
        setLastSearchTerm,
        opened,
        setOpened,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
