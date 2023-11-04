import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../../context/SearchContext';

interface IPagingProps {
  pagesCount: number;
}

function Paging({ pagesCount }: IPagingProps) {
  const { currentPage, setOpened } = useContext(SearchContext);
  const current =
    currentPage && +currentPage <= pagesCount
      ? +currentPage
      : currentPage && +currentPage > pagesCount
      ? pagesCount
      : 1;
  let pages = [] as number[];
  let first = 1;
  if (pagesCount <= 5 || current - 2 < 1) {
    first = 1;
  } else if (current + 2 > pagesCount) {
    first = pagesCount - 4;
  } else {
    first = current - 2;
  }

  const shownPagesNumber = pagesCount > 5 ? 5 : pagesCount;
  pages = new Array(shownPagesNumber).fill(1).map((_, index) => index + first);
  return (
    <div className="paging-container" onClick={() => setOpened(false)}>
      <Link
        to={`/search/1`}
        className={current > 1 ? `paging-button` : `paging-button disabled`}
      >
        {'<<'}
      </Link>
      {pages.map((num) =>
        current === num ? (
          <span className="active paging-button" key={num}>
            {num}
          </span>
        ) : (
          <Link key={num} className="paging-button" to={`/search/${num}`}>
            {num}
          </Link>
        )
      )}
      <Link
        to={`/search/${pagesCount}`}
        className={
          current < pagesCount ? `paging-button` : `paging-button disabled`
        }
      >
        {'>>'}
      </Link>
    </div>
  );
}

export default Paging;
