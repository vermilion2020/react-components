import React from 'react';
import classes from '../../../styles/paging.module.css';
import { AppDispatch, useAppSelector } from '../../../redux';
import { useRouter } from 'next/navigation';
import { setPage } from '../../../redux/features/searchSlice';
import { useDispatch } from 'react-redux';

interface IPagingProps {
  loading: boolean;
  countItems: number;
}

function Paging({ loading, countItems }: IPagingProps) {
  const { page: currentPage, perPage } = useAppSelector(
    (state) => state.searchState
  );
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const pagesCount = Math.ceil(countItems / perPage);

  const setCurrentPage = (page: number) => {
    dispatch(setPage(page));
    router.push(`/page/${page}`);
  };

  const current = currentPage && +currentPage >= 0 ? +currentPage : 1;
  let pages = [] as number[];
  let first = 1;
  if (current > pagesCount && pagesCount > 5) {
    first = pagesCount - 4;
  } else if (pagesCount <= 5 || current - 2 < 1) {
    first = 1;
  } else if (current + 2 > pagesCount) {
    first = pagesCount - 4;
  } else {
    first = current - 2;
  }
  const shownPagesNumber = pagesCount > 5 ? 5 : pagesCount;

  pages = new Array(shownPagesNumber).fill(1).map((_, index) => index + first);
  return (
    <div
      className={
        loading
          ? `${classes.pagingContainer} ${classes.disabled}`
          : classes.pagingContainer
      }
      data-testid="paging-container"
    >
      <button
        onClick={() => setCurrentPage(1)}
        className={
          current > 1
            ? classes.pagingButton
            : `${classes.pagingButton} ${classes.disabled}`
        }
      >
        {'<<'}
      </button>
      {pages.map((num) =>
        current === num ? (
          <button
            className={`${classes.pagingButton} ${classes.active}`}
            name={`${num}`}
            key={num}
          >
            {num}
          </button>
        ) : (
          <button
            onClick={() => setCurrentPage(num)}
            key={num}
            className={classes.pagingButton}
            name={`${num}`}
          >
            {num}
          </button>
        )
      )}
      <button
        onClick={() => setCurrentPage(pagesCount)}
        className={
          current < pagesCount
            ? classes.pagingButton
            : `${classes.pagingButton} ${classes.disabled}`
        }
      >
        {'>>'}
      </button>
    </div>
  );
}

export default Paging;
