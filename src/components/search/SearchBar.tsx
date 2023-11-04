import { SearchContext } from '../../context/SearchContext';
import { useContext, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export const PLACEHOLDER_TEXT = 'Search for a beer';

function SearchBar() {
  const { lastSearchTerm, setLastSearchTerm, setOpened } =
    useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState(lastSearchTerm);
  const navigate = useNavigate();

  const handleSearchClick = async () => {
    if (lastSearchTerm !== searchTerm) {
      window.localStorage.setItem('searchTerm', `${searchTerm}`);
      setLastSearchTerm(searchTerm);
      setOpened(false);
      navigate(`/search/1`);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.trim();
    setSearchTerm(term);
  };

  return (
    <>
      <div className="search">
        <input
          data-testid="search-input"
          className="search-input"
          type="search"
          id="search-input"
          placeholder={PLACEHOLDER_TEXT}
          value={searchTerm}
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
      </div>
      <button
        className={searchTerm === lastSearchTerm ? `button disabled` : `button`}
        onClick={() => handleSearchClick()}
      >
        Search
      </button>
    </>
  );
}

export default SearchBar;
