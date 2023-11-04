import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../../context/SearchContext';
import { PER_PAGE_OPTIONS } from '../../../config';

function PerPage() {
  const { setItemsPerPage, itemsPerPage, opened, setOpened } =
    useContext(SearchContext);
  const navigate = useNavigate();

  const handleClick = (num: number) => {
    setItemsPerPage(num);
    setOpened(false);
    localStorage.setItem('perPage', `${num}`);
    navigate(`/search/1`);
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
