import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_PAGE,
  PER_PAGE_OPTIONS,
} from '../../../config';
import { useAppSelector } from '../../../redux';

function PerPage() {
  const [opened, setOpened] = useState(false);
  const { searchTerm } = useAppSelector((state) => state.searchState);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setOpened(false);
  }, [searchParams, searchTerm]);

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
      <div
        className="per-page--current"
        data-testid="per-page-current"
        onClick={() => setOpened(!opened)}
      >
        {itemsPerPage}
      </div>
      {opened && (
        <ul className="per-page--container" data-testid="per-page-container">
          {PER_PAGE_OPTIONS.map((num) => (
            <li
              key={num}
              title={`${num}`}
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
