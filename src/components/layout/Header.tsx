import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <h1>React. Forms</h1>
      <NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/">Main</NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/uncontrolled">Uncontrolled</NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active-link' : '')} to="/controlled">Controlled</NavLink>
    </header>
  );
}

export default Header;
