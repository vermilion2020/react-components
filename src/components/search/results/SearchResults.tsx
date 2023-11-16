import Preloader from '../Preloader';
import { IItem } from '../../../model/response.interface';
import Item from './Item';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import ItemsStatMessage from './ItemsStatMessage';
import { NO_ITEMS_MESSAGE } from '../../../config';
import { useAppSelector } from '../../../redux';

interface ISearchResultsProps {
  isLoading: boolean;
}

function SearchResults({ isLoading }: ISearchResultsProps) {
  const { countItems, currentSearchTerm } = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const items = useAppSelector((state) => state.searchState.items);

  const setDefault = () => {
    if (searchParams.get('details')) {
      searchParams.delete('details');
      setSearchParams(searchParams);
    }
  };

  return (
    <section className="search-results-section">
      <section className="card-items" onClick={setDefault}>
        {isLoading && <Preloader />}
        {!isLoading && !items.length && (
          <div className="no-items-message">{NO_ITEMS_MESSAGE}</div>
        )}
        {!isLoading && !searchParams.get('details') && (
          <ItemsStatMessage
            countItems={countItems}
            searchTerm={currentSearchTerm}
          />
        )}
        {!isLoading &&
          items.length !== 0 &&
          items.map((item: IItem) => <Item item={item} key={item.id} />)}
      </section>
      {!!searchParams.get('details') && <Outlet />}
    </section>
  );
}

export default SearchResults;
