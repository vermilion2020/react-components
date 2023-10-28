import { DEFAULT_PAGE_NUMBER } from '../axios-config';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import Fallback from '../components/error-boundary/Fallback';
import Search from '../components/search/SearchContainer';
import { IState } from '../model/state.interface';

function HomePage() {
  const searchTerm = (localStorage.getItem('searchTerm') ?? '').trim();
  const defaultState: IState = {
    isLoading: true,
    error: '',
    items: [],
    pageNumber: DEFAULT_PAGE_NUMBER,
    searchTerm,
  };

  return (
    <div className="content">
      <ErrorBoundary fallback={<Fallback />}>
        <Search defaultState={defaultState} />
      </ErrorBoundary>
    </div>
  );
}

export default HomePage;
