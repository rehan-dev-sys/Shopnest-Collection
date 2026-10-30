
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalPrice,
    cartMessage,
    getStock,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products" className="btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Your Cart</h1>

      {cartMessage && (
        <p role="status" className="cart-message">
          {cartMessage}
        </p>
      )}

      <div className="cart-list">
        {cart.map((item) => {
          const availableStock = getStock(item.id);

          return (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p className="price">Rs. {item.price}</p>

                <p>
                  Available stock: {availableStock}
                </p>

                {availableStock === 0 && (
                  <p>Out of stock</p>
                )}
              </div>

              <div className="qty-box">
                <button
                  onClick={() => decreaseQty(item.id)}
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  disabled={item.quantity >= availableStock}
                  aria-label={`Increase ${item.name} quantity`}
                >
                  +
                </button>
              </div>

              <p className="item-total">
                Rs. {item.price * item.quantity}
              </p>

              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <h2>Total: Rs. {totalPrice}</h2>

        <div className="summary-buttons">
          <button
            className="btn btn-outline"
            onClick={clearCart}
          >
            Clear Cart
          </button>

          <Link to="/checkout" className="btn btn-large">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
