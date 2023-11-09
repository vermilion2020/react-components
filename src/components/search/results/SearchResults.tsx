import Preloader from '../Preloader';
import { IItem } from '../../../model/response.interface';
import Item from './Item';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import ItemsStatMessage from './ItemsStatMessage';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_PAGE,
  NO_ITEMS_MESSAGE,
} from '../../../config';

interface ISearchResultsProps {
  isLoading: boolean;
}

function SearchResults({ isLoading }: ISearchResultsProps) {
  const { setOpened, countItems, lastSearchTerm, items } =
    useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const setDefault = () => {
    setOpened(false);
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
            currentPage={
              searchParams.get('page') ?? DEFAULT_PAGE_NUMBER.toString()
            }
            itemsPerPage={
              searchParams.get('per_page') ?? DEFAULT_PER_PAGE.toString()
            }
            countItems={countItems}
            searchTerm={lastSearchTerm}
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
