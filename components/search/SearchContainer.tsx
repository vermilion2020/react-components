import React from 'react';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
import Paging from './paging/Paging';
import PerPage from './paging/PerPage';
import { AppDispatch, useAppSelector } from '../../redux';
import {
  getCountItems,
  setDetails,
  setError,
} from '../../redux/features/searchSlice';
import { useDispatch } from 'react-redux';
import classes from '../../styles/search.module.css';
import Preloader from './Preloader';
import ItemsStatMessage from './results/ItemsStatMessage';
import { NO_ITEMS_MESSAGE } from '../../config';
import { IItem } from '../../model/response.interface';
import Item from './results/Item';
import DetailedCard from '../item/DetailedCard';

interface ISearchContainerProps {
  loading: boolean;
  items: IItem[];
}

function SearchContainer({ items, loading }: ISearchContainerProps) {
  const { countItems, searchTerm, details, error } = useAppSelector(
    (state) => state.searchState
  );
  const dispatch = useDispatch<AppDispatch>();

  const setDefault = () => {
    if (details) {
      dispatch(setDetails(0));
    }
  };

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    dispatch(getCountItems(''));
  }, [error, countItems, searchTerm, items]);

  return (
    <div className={classes.content}>
      <div className={classes.searchContainer}>
        <section className={classes.searchBarSection}>
          <div className={classes.searchForm}>
            <SearchBar />
            <button
              className={classes.button}
              onClick={() => {
                dispatch(setError('Error!!!'));
              }}
              data-testid="error-button"
            >
              Get an Error
            </button>
            <Paging loading={loading} countItems={countItems} />
            <PerPage />
          </div>
        </section>
        <section className={classes.searchResultsSection}>
          <section className={classes.cardItems} onClick={setDefault}>
            {loading && <Preloader />}
            {!loading && items && !items.length && (
              <div className={classes.noItemsMessage}>{NO_ITEMS_MESSAGE}</div>
            )}
            {!loading && !details && (
              <ItemsStatMessage
                countItems={countItems}
                searchTerm={searchTerm}
              />
            )}
            {!loading &&
              items &&
              items.length !== 0 &&
              items.map((item: IItem) => <Item item={item} key={item.id} />)}
          </section>
          {details !== 0 && <DetailedCard />}
        </section>
      </div>
    </div>
  );
}

export default SearchContainer;
