import ErrorBoundary from '../components/ErrorBoundary';
import SearchResults from '../components/search/SearchResults';
import SearchBar from '../components/searchbar/SearchBar';
import { IState } from '../model/state.interface';

function Home() {
  const searchTerm = localStorage.getItem('searchTerm') ?? '';
  const defaultState: IState = {
    isLoading: true,
    error: '',
    items: [],
    searchTerm,
  };

  return (
    <div className="content">
      <SearchBar searchTerm="" handleSearchTermChange={() => {}} />
      <ErrorBoundary
        fallback={<div className="error-message">Something went wrong</div>}
      >
        <SearchResults defaultState={defaultState} />
      </ErrorBoundary>
    </div>
  );
}

export default Home;
