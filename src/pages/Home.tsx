import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import Fallback from '../components/error-boundary/Fallback';

function HomePage() {
  return (
    <div className="content">
      <ErrorBoundary fallback={<Fallback />}>
        <h1>Home</h1>
      </ErrorBoundary>
    </div>
  );
}

export default HomePage;
