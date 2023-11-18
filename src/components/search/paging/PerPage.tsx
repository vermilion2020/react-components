import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_NUMBER, PER_PAGE_OPTIONS } from '../../../config';
import { AppDispatch, useAppSelector } from '../../../redux';
import { useDispatch } from 'react-redux';
import { setDetails, setPerPage } from '../../../redux/features/searchSlice';

function PerPage() {
  const [opened, setOpened] = useState(false);
  const { searchTerm, perPage } = useAppSelector((state) => state.searchState);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setOpened(false);
  }, [searchParams, searchTerm]);

  const handleClick = (num: number) => {
    searchParams.set('page', `${DEFAULT_PAGE_NUMBER}`);
    dispatch(setPerPage(num));
    dispatch(setDetails(0));
    setSearchParams(searchParams);
    setOpened(false);
  };
  return (
    <div className="per-page">
      <div
        className="per-page--current"
        data-testid="per-page-current"
        onClick={() => setOpened(!opened)}
      >
        {perPage}
      </div>
      {opened && (
        <ul className="per-page--container" data-testid="per-page-container">
          {PER_PAGE_OPTIONS.map((num) => (
            <li
              key={num}
              title={`${num}`}
              onClick={() => handleClick(num)}
              className={num === perPage ? 'active' : ''}
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
