import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../axios-config';
import ErrorBoundary from '../components/ErrorBoundary';
import Fallback from '../components/Fallback';
import Search from '../components/search/Search';
import { IState } from '../model/state.interface';

function Home() {
  const searchTerm = (localStorage.getItem('searchTerm') ?? '').trim();
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
      <ErrorBoundary fallback={<Fallback />}>
        <Search defaultState={defaultState} />
      </ErrorBoundary>
    </div>
  );
}

export default Home;
