import Preloader from '../Preloader';
import { IItem } from '../../../model/response.interface';
import Item from './Item';
import { Outlet } from 'react-router-dom';

export const NO_ITEMS_MESSAGE = 'No items found for the current search term';

interface ISearchResultsProps {
  isLoading: boolean;
  items: IItem[];
}

function SearchResults({ isLoading, items }: ISearchResultsProps) {
  return (
    <section className="search-results-section">
      <div className="card-items">
        {isLoading && <Preloader />}
        {!isLoading && !items.length && (
          <div className="no-items-message">{NO_ITEMS_MESSAGE}</div>
        )}
        {!isLoading &&
          items.length !== 0 &&
          items.map((item: IItem) => <Item item={item} key={item.id} />)}
      </div>
      <Outlet />
    </section>
  );
}

export default SearchResults;
