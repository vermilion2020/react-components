import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer';

const imagesTurnedOn = !!localStorage.getItem('images');

const toggleImages = () => {
  if (!imagesTurnedOn) {
    localStorage.setItem('images', 'true');
  } else {
    localStorage.removeItem('images');
  }
};

function Layout() {
  return (
    <>
      <header className="app-header">
        <h1>
          <Link to="/">React Components</Link>
        </h1>
        <div>
          <a className="images-link" href="/" onClick={toggleImages}>
            {imagesTurnedOn ? 'Turn off images' : 'Turn on image'}
          </a>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
