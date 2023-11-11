import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../../context/SearchContext';
import { DEFAULT_PER_PAGE } from '../../../config';

interface IPagingProps {
  loading: boolean;
}

function Paging({ loading }: IPagingProps) {
  const { countItems } = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = +(searchParams.get('per_page') ?? DEFAULT_PER_PAGE);
  const pagesCount = Math.ceil(countItems / perPage);

  const setCurrentPage = (page: number) => {
    searchParams.delete('details');
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
  };

  const currentPage = searchParams.get('page');
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
    <div className={loading ? `paging-container disabled` : `paging-container`}>
      <button
        onClick={() => setCurrentPage(1)}
        className={current > 1 ? `paging-button` : `paging-button disabled`}
      >
        {'<<'}
      </button>
      {pages.map((num) =>
        current === num ? (
          <button className="active paging-button" key={num}>
            {num}
          </button>
        ) : (
          <button
            onClick={() => setCurrentPage(num)}
            key={num}
            className="paging-button"
          >
            {num}
          </button>
        )
      )}
      <button
        onClick={() => setCurrentPage(pagesCount)}
        className={
          current < pagesCount ? `paging-button` : `paging-button disabled`
        }
      >
        {'>>'}
      </button>
    </div>
  );
}

export default Paging;
