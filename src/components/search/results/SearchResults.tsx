import Preloader from '../Preloader';
import { IItem } from '../../../model/response.interface';
import Item from './Item';
import { Outlet, useSearchParams } from 'react-router-dom';
import ItemsStatMessage from './ItemsStatMessage';
import { DEFAULT_PAGE_NUMBER, NO_ITEMS_MESSAGE } from '../../../config';
import { AppDispatch, useAppSelector } from '../../../redux';
import { useGetItemsListQuery } from '../../../redux/api/itemsApi';
import { setDetails } from '../../../redux/features/searchSlice';
import { useDispatch } from 'react-redux';

interface ISearchResultsProps {
  isLoading: boolean;
}

function SearchResults({ isLoading }: ISearchResultsProps) {
  const { searchTerm, details, perPage, countItems } = useAppSelector(
    (state) => state.searchState
  );
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const page = +(searchParams.get('page') ?? DEFAULT_PAGE_NUMBER);

  const { data: items } = useGetItemsListQuery({
    page,
    per_page: perPage,
    beer_name: searchTerm,
  });

  const setDefault = () => {
    if (details) {
      dispatch(setDetails(0));
    }
  };

  return (
    <section className="search-results-section">
      <section className="card-items" onClick={setDefault}>
        {isLoading && <Preloader />}
        {!isLoading && items && !items.length && (
          <div className="no-items-message">{NO_ITEMS_MESSAGE}</div>
        )}
        {!isLoading && !details && (
          <ItemsStatMessage countItems={countItems} searchTerm={searchTerm} />
        )}
        {!isLoading &&
          items &&
          items.length !== 0 &&
          items.map((item: IItem) => <Item item={item} key={item.id} />)}
      </section>
      {details !== 0 && <Outlet />}
    </section>
  );
}

export default SearchResults;
