import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../../context/SearchContext';
import { DEFAULT_PER_PAGE, PER_PAGE_OPTIONS } from '../../../config';

function PerPage() {
  const { opened, setOpened } = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (num: number) => {
    searchParams.set('per_page', `${num}`);
    searchParams.delete('details');
    setSearchParams(searchParams);
    setOpened(false);
  };
  const itemsPerPage = +(searchParams.get('per_page') ?? DEFAULT_PER_PAGE);
  return (
    <div className="per-page">
      <div className="per-page--current" onClick={() => setOpened(!opened)}>
        {itemsPerPage}
      </div>
      {opened && (
        <ul className="per-page--container">
          {PER_PAGE_OPTIONS.map((num) => (
            <li
              key={num}
              onClick={() => handleClick(num)}
              className={num === itemsPerPage ? 'active' : ''}
            >
              {num}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PerPage;
