import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cart, totalPrice, placeOrder } = useCart();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    payment: 'Cash on Delivery',
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedTotal, setPlacedTotal] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (form.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!/^03\d{9}$/.test(form.phone)) {
      newErrors.phone = 'Enter a valid phone number (e.g. 03001234567)';
    }

    if (form.address.trim().length < 10) {
      newErrors.address = 'Please enter your full address';
    }

    if (form.city.trim() === '') {
      newErrors.city = 'City is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save total before cart is cleared
    const orderTotal = totalPrice;

    // Check stock and place order
    const result = placeOrder();

    if (!result.success) {
      setErrors({ stock: result.message });
      return;
    }

    setErrors({});
    setPlacedTotal(orderTotal);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="page">
        <div className="success-box">
          <h1>Order Placed Successfully! 🎉</h1>

          <p>
            Thank you, {form.name}. Your order will be delivered to {form.city} soon.
          </p>

          <p>
            Total: Rs. {placedTotal}
          </p>

          <Link to="/products" className="btn btn-large">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>

        <Link to="/products" className="btn">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Delivery Details</h2>

          {errors.stock && (
            <p className="error" role="alert">
              {errors.stock}
            </p>
          )}

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="03001234567"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label>Address</label>
          <textarea
            name="address"
            rows="3"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}

          <label>City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}

          <label>Payment Method</label>
          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
          >
            <option>Cash on Delivery</option>
            <option>Credit / Debit Card</option>
            <option>Easypaisa / JazzCash</option>
          </select>

          <button type="submit" className="btn btn-large">
            Place Order
          </button>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>
                {item.name} x {item.quantity}
              </span>

              <span>
                Rs. {item.price * item.quantity}
              </span>
            </div>
          ))}

          <hr />

          <div className="summary-row total-row">
            <span>Total</span>
            <span>Rs. {totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;