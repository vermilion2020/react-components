import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_PAGE,
  PER_PAGE_OPTIONS,
} from '../../../config';
import { SearchContext } from '../../../context/SearchContext';

function PerPage() {
  const [opened, setOpened] = useState(false);
  const { currentSearchTerm } = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setOpened(false);
  }, [searchParams, currentSearchTerm]);

  const handleClick = (num: number) => {
    searchParams.set('per_page', `${num}`);
    searchParams.set('page', `${DEFAULT_PAGE_NUMBER}`);
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
