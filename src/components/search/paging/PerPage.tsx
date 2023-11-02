import { useContext } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import { PER_PAGE_OPTIONS } from '../../../axios-config';

function PerPage() {
  const { setItemsPerPage, itemsPerPage, opened, setOpened } =
    useContext(SearchContext);

  const handleClick = (num: number) => {
    setItemsPerPage(num);
    setOpened(false);
    localStorage.setItem('perPage', `${num}`);
  };
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
