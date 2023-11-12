import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import Fallback from '../components/error-boundary/Fallback';
import Search from '../components/search/SearchContainer';

function HomePage() {
  return (
    <div className="content">
      <ErrorBoundary fallback={<Fallback />}>
        <Search />
      </ErrorBoundary>
    </div>
  );
}

export default HomePage;
