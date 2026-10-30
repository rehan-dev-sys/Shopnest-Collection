import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <h3>ShopNest Collection</h3>
          <p>Your one-stop shop for clothing, footwear, accessories and electronics.</p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <p>📍 Burewala, Pakistan</p>
          <p>📞 0300-1234567</p>
          <p>✉️ alirehan5555@shopnest.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ShopNest Collection. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;