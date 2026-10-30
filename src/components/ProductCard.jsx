
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product, stock }) {
  const { addToCart } = useCart();

  const isOutOfStock = stock <= 0;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="card-info">
        <h3>{product.name}</h3>

        <p className="category">{product.category}</p>

        <p className="price">Rs. {product.price}</p>

        <p>
          Available Stock: {stock}
        </p>

        {isOutOfStock && (
          <p className="error">Out of Stock</p>
        )}

        <div className="card-buttons">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline"
          >
            View Details
          </Link>

          <button
            className="btn"
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
