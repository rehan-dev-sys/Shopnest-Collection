
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

function Home() {
  const { getStock } = useCart();

  const featured = products.slice(0, 4);
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopNest Collection</h1>
          <p>
            Discover the latest fashion, shoes, accessories and gadgets at the best prices.
          </p>
          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      <div className="page">
        <section className="section">
          <h2 className="section-title">Shop by Category</h2>

          <div className="category-list">
            {categories.map((cat) => (
              <Link to="/products" className="category-card" key={cat}>
                {cat}
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Featured Products</h2>

          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                stock={getStock(product.id)}
              />
            ))}
          </div>

          <div className="center-btn">
            <Link to="/products" className="btn btn-large">
              View All Products
            </Link>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Why Choose Us</h2>

          <div className="features">
            <div className="feature-box">
              <span>🚚</span>
              <h3>Fast Delivery</h3>
              <p>Quick delivery to your doorstep.</p>
            </div>

            <div className="feature-box">
              <span>🔒</span>
              <h3>Secure Payment</h3>
              <p>Safe and easy payment options.</p>
            </div>

            <div className="feature-box">
              <span>🔄</span>
              <h3>Easy Returns</h3>
              <p>Simple return policy for peace of mind.</p>
            </div>

            <div className="feature-box">
              <span>💬</span>
              <h3>24/7 Support</h3>
              <p>We are always here to help you.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
