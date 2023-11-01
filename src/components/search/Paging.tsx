import { Link } from 'react-router-dom';

interface IPagingProps {
  pagesCount: number;
  currentPage?: string;
}

function Paging({ pagesCount, currentPage }: IPagingProps) {
  const current = currentPage ? +currentPage : 0;
  let pages = [] as number[];
  if (pagesCount <= 3) {
    pages = new Array(pagesCount).fill(1).map((_, index) => index + 1);
  }

  const prev = 0;
  const next = 0;
  return (
    <div className="paging-container">
      <Link to={`/search/1`} className="paging-button">
        {'<<'}
      </Link>
      <Link to={`/search/${prev}`} className="paging-button">
        {'<'}
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
      <Link to={`/search/${next}`} className="paging-button">
        {'>'}
      </Link>
      <Link to={`/search/${pagesCount}`} className="paging-button">
        {'>>'}
      </Link>
    </div>
  );
}

export default Paging;
