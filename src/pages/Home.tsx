import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../axios-config';
import ErrorBoundary from '../components/ErrorBoundary';
import SearchResults from '../components/search/SearchResults';
import SearchBar from '../components/search/SearchBar';
import { IState } from '../model/state.interface';

function Home() {
  const searchTerm = localStorage.getItem('searchTerm') ?? '';
  const defaultState: IState = {
    isLoading: true,
    error: '',
    items: [],
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
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
