import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';

const categories = [...new Set(products.map((p) => p.category))];

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h2 className="logo">ShopNest Collection</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>

        <div className="dropdown">
          <Link to="/products">Categories ▾</Link>
          <div className="dropdown-menu">
            {categories.map((c) => (
              <Link key={c} to={`/category/${c.toLowerCase()}`}>
                {c}
              </Link>
            ))}
          </div>
        </div>

        <Link to="/cart">Cart ({totalItems})</Link>

        {user ? (
          <>
            <span className="welcome">Hi, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;