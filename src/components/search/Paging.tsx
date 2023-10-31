import { Link } from 'react-router-dom';

interface IPagingProps {
  pagesCount: number;
  currentPage?: string;
}

function Paging({ pagesCount, currentPage }: IPagingProps) {
  const current = currentPage ? +currentPage : 0;
  const pages = new Array(pagesCount).fill(1).map((_, index) => index + 1);
  return (
    <div>
      {pages.map((num) =>
        current === num ? (
          <span className="active paging-button" key={num}>
            {num}
          </span>
        ) : (
          <Link key={num} className="paging-button" to={`/page/${num}`}>
            {num}
          </Link>
        )
      )}
    </div>
  );
}

export default Paging;
