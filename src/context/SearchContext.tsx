import { createContext, useState } from 'react';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE } from '../axios-config';

interface ISearchContext {
  currentPage: number;
  countPages: number;
  itemsPerPage: number;
  currentItemId: number;
  lastSearchTerm: string;
  opened: boolean;
  setCurrentPage: (currentPage: number) => void;
  setCountPages: (countPages: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  setLastSearchTerm: (lastSearchTerm: string) => void;
  setCurrentItemId: (currentItemId: number) => void;
  setOpened: (opened: boolean) => void;
}

export const SearchContext = createContext<ISearchContext>({
  currentPage: DEFAULT_PAGE_NUMBER,
  countPages: 0,
  itemsPerPage: DEFAULT_PER_PAGE,
  lastSearchTerm: '',
  currentItemId: 0,
  opened: false,
  setCurrentPage: () => {
    /**/
  },
  setCountPages: () => {
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
  const [countPages, setCountPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(defaultPerPage);
  const [currentItemId, setCurrentItemId] = useState(0);
  const [lastSearchTerm, setLastSearchTerm] = useState(defaultSearchTerm);
  const [opened, setOpened] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        countPages,
        setCountPages,
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
