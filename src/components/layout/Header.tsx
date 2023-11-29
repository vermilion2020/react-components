import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <h1>
        <Link to="/">Redux. Forms.</Link>
      </h1>
    </header>
  );
}

export default Header;
