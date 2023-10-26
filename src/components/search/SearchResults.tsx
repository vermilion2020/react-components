import Preloader from '../Preloader';
import { IItem } from '../../model/response.interface';
import Item from './Item';

interface ISearchResultsProps {
  isLoading: boolean;
  error: string;
  items: IItem[];
}

function SearchResults({ isLoading, error, items }: ISearchResultsProps) {
  const imagesTurnedOn = !!localStorage.getItem('images');
  return (
    <section className="search-results-section">
      {error && <div>{error}</div>}
      {isLoading && <Preloader />}
      {!isLoading && !error && !items.length && (
        <div className="no-items-message">
          No items found for the current search term
        </div>
      )}
      {!isLoading &&
        !error &&
        items.length !== 0 &&
        items.map((item: IItem) => (
          <Item item={item} key={item.id} imagesTurnedOn={imagesTurnedOn} />
        ))}
    </section>
  );
}

export default SearchResults;
