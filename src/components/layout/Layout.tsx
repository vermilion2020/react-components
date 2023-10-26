import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <header className="app-header">
        <h1>
          <Link to="/">React Components</Link>
        </h1>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
