import React from 'react';
import Preloader from '../Preloader';
import { IItem } from '../../../model/response.interface';
import Item from './Item';
import ItemsStatMessage from './ItemsStatMessage';
import { NO_ITEMS_MESSAGE } from '../../../config';
import { AppDispatch, useAppSelector } from '../../../redux';
import { setDetails } from '../../../redux/features/searchSlice';
import { useDispatch } from 'react-redux';
import classes from '../../../styles/search-results.module.css';
import DetailedCard from '../../item/DetailedCard';

interface ISearchResultsProps {
  isLoading: boolean;
}

function SearchResults({ isLoading }: ISearchResultsProps) {
  const { searchTerm, details, countItems, items } = useAppSelector(
    (state) => state.searchState
  );
  const dispatch = useDispatch<AppDispatch>();

  const setDefault = () => {
    if (details) {
      dispatch(setDetails(0));
    }
  };

  return (
    <section className={classes.searchResultsSection}>
      <section className={classes.cardItems} onClick={setDefault}>
        {isLoading && <Preloader />}
        {!isLoading && items && !items.length && (
          <div className={classes.noItemsMessage}>{NO_ITEMS_MESSAGE}</div>
        )}
        {!isLoading && !details && (
          <ItemsStatMessage countItems={countItems} searchTerm={searchTerm} />
        )}
        {!isLoading &&
          items &&
          items.length !== 0 &&
          items.map((item: IItem) => <Item item={item} key={item.id} />)}
      </section>
      {details !== 0 && <DetailedCard />}
    </section>
  );
}

export default SearchResults;
