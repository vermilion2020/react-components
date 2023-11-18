import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_NUMBER } from '../../../config';
import { useAppSelector } from '../../../redux';

interface IItemsStatMessageProps {
  countItems: number;
  searchTerm: string;
}

function ItemsStatMessage({ countItems, searchTerm }: IItemsStatMessageProps) {
  const { perPage } = useAppSelector((state) => state.searchState);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? DEFAULT_PAGE_NUMBER;
  const term = !searchTerm.length ? 'an empty term' : `"${searchTerm}"`;
  return (
    <div className="items-stat-message">
      {`current page: ${currentPage} | items per page: ${perPage} | count items for ${term}: ${countItems}`}
    </div>
  );
}

export default ItemsStatMessage;
