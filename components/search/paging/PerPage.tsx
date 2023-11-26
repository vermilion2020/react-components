import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DEFAULT_PAGE_NUMBER, PER_PAGE_OPTIONS } from '../../../config';
import { AppDispatch, useAppSelector } from '../../../redux';
import { useDispatch } from 'react-redux';
import {
  setDetails,
  setPage,
  setPerPage,
} from '../../../redux/features/searchSlice';
import classes from '../../../styles/paging.module.css';

function PerPage() {
  const [opened, setOpened] = useState(false);
  const { searchTerm, perPage } = useAppSelector((state) => state.searchState);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    setOpened(false);
  }, [searchTerm]);

  const handleClick = (num: number) => {
    dispatch(setPage(1));
    dispatch(setPerPage(num));
    dispatch(setDetails(0));
    setOpened(false);
    router.push(`/page/${DEFAULT_PAGE_NUMBER}`);
  };
  return (
    <div className="per-page">
      <div
        className={classes.perPageCurrent}
        data-testid="per-page-current"
        onClick={() => setOpened(!opened)}
      >
        {perPage}
      </div>
      {opened && (
        <ul
          className={classes.perPageContainer}
          data-testid="per-page-container"
        >
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
