import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE } from '../../../config';

interface IItemsStatMessage {
  countItems: number;
  searchTerm: string;
}

function ItemsStatMessage({ countItems, searchTerm }: IItemsStatMessage) {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? DEFAULT_PAGE_NUMBER;
  const itemsPerPage = searchParams.get('per_page') ?? DEFAULT_PER_PAGE;
  const term = !searchTerm.length ? 'an empty term' : `"${searchTerm}"`;
  return (
    <div className="items-stat-message">
      {`current page: ${currentPage} | items per page: ${itemsPerPage} | count items for ${term}: ${countItems}`}
    </div>
  );
}

export default ItemsStatMessage;
