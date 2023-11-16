import Preloader from '../Preloader';
import { IItem } from '../../../model/response.interface';
import Item from './Item';
import { Outlet, useSearchParams } from 'react-router-dom';
import ItemsStatMessage from './ItemsStatMessage';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_PAGE,
  NO_ITEMS_MESSAGE,
} from '../../../config';
import { useAppSelector } from '../../../redux';
import { useGetItemsListQuery } from '../../../redux/api/itemsApi';

interface ISearchResultsProps {
  isLoading: boolean;
}

function SearchResults({ isLoading }: ISearchResultsProps) {
  const { countItems, searchTerm } = useAppSelector(
    (state) => state.searchState
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') ?? DEFAULT_PAGE_NUMBER);
  const perPage = +(searchParams.get('per_page') ?? DEFAULT_PER_PAGE);

  const { data: items } = useGetItemsListQuery({
    page,
    per_page: perPage,
    beer_name: searchTerm,
  });

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
        {!isLoading && items && !items.length && (
          <div className="no-items-message">{NO_ITEMS_MESSAGE}</div>
        )}
        {!isLoading && !searchParams.get('details') && (
          <ItemsStatMessage countItems={countItems} searchTerm={searchTerm} />
        )}
        {!isLoading &&
          items &&
          items.length !== 0 &&
          items.map((item: IItem) => <Item item={item} key={item.id} />)}
      </section>
      {!!searchParams.get('details') && <Outlet />}
    </section>
  );
}

export default SearchResults;
