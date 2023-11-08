import Preloader from '../Preloader';
import { IItem } from '../../../model/response.interface';
import Item from './Item';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import ItemsStatMessage from './ItemsStatMessage';
import { NO_ITEMS_MESSAGE } from '../../../config';

interface ISearchResultsProps {
  isLoading: boolean;
  items: IItem[];
}

function SearchResults({ isLoading, items }: ISearchResultsProps) {
  const { setOpened, itemsPerPage, countItems, lastSearchTerm } =
    useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams({});
  const { page: currentPage } = useParams();

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
            currentPage={currentPage ?? ''}
            itemsPerPage={itemsPerPage}
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
