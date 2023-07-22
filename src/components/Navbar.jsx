import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export const Navbar = () => {
  return (
    <div className="navCantainer">
      <button className="navButton">
        <Link
          style={{ textDecoration: 'none', color: 'white' }}
          to="/adminLogin"
        >
          Admin Login
        </Link>
      </button>
      <button className="navButton">
        <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
          Submit Ticket
        </Link>
      </button>
    </div>
  );
};
