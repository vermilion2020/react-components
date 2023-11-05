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

  const handleSubmit = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearchClick();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.trim();
    setSearchTerm(term);
  };

  return (
    <form
      className="search-form"
      onSubmit={(e: React.KeyboardEvent<HTMLFormElement>) => handleSubmit(e)}
    >
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
        type="button"
        className={searchTerm === lastSearchTerm ? `button disabled` : `button`}
        onClick={() => handleSearchClick()}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
