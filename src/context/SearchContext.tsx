import { createContext, useState } from 'react';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE } from '../axios-config';

interface ISearchContext {
  currentPage: number;
  countPages: number;
  itemsPerPage: number;
  currentItemId: number;
  lastSearchTerm: string;
  setCurrentPage: (currentPage: number) => void;
  setCountPages: (countPages: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  setLastSearchTerm: (lastSearchTerm: string) => void;
  setCurrentItemId: (currentItemId: number) => void;
}

export const SearchContext = createContext<ISearchContext>({
  currentPage: DEFAULT_PAGE_NUMBER,
  countPages: 0,
  itemsPerPage: DEFAULT_PER_PAGE,
  lastSearchTerm: '',
  currentItemId: 0,
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
});

export const SearchState = ({ children }: { children: React.ReactNode }) => {
  const defaultSearchTerm = localStorage.getItem('searchTerm') ?? '';
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [countPages, setCountPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_PER_PAGE);
  const [currentItemId, setCurrentItemId] = useState(0);
  const [lastSearchTerm, setLastSearchTerm] = useState(defaultSearchTerm);

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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
