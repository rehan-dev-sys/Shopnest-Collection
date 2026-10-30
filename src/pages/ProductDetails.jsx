import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="page">
        <h2>Product not found</h2>
        <Link to="/products" className="btn">Back to Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page">
      <Link to="/products" className="back-link">← Back to Products</Link>

      <div className="details-container">
        <img src={product.image} alt={product.name} className="details-image" />

        <div className="details-info">
          <h1>{product.name}</h1>
          <p className="category">{product.category}</p>
          <p className="price">Rs. {product.price}</p>
          <p className="description">{product.description}</p>

          <div className="qty-box">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button className="btn btn-large" onClick={handleAddToCart}>
            Add to Cart
          </button>

          {added && <p className="success-msg">Added to cart!</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;