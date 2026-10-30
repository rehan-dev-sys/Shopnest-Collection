
import { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Initialize stock from localStorage or products
  const [stock, setStock] = useState(() => {
    const defaultStock = Object.fromEntries(
      products.map((product) => [product.id, product.stock])
    );

    try {
      const savedStock = localStorage.getItem('productStock');

      return savedStock
        ? { ...defaultStock, ...JSON.parse(savedStock) }
        : defaultStock;
    } catch {
      return defaultStock;
    }
  });

  const [cartMessage, setCartMessage] = useState('');

  // Save cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save updated stock
  useEffect(() => {
    localStorage.setItem('productStock', JSON.stringify(stock));
  }, [stock]);

  // Get remaining stock
  const getStock = (id) => stock[id] ?? 0;

  // Add product to cart
  const addToCart = (product) => {
    const availableStock = getStock(product.id);
    const exists = cart.find((item) => item.id === product.id);

    if (availableStock <= 0) {
      setCartMessage(`${product.name} is out of stock!`);
      return false;
    }

    if (exists && exists.quantity >= availableStock) {
      setCartMessage(`Only ${availableStock} units are available.`);
      return false;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setCartMessage(`${product.name} added to cart!`);
    return true;
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setCartMessage('');
  };

  // Increase quantity
  const increaseQty = (id) => {
    const item = cart.find((product) => product.id === id);

    if (!item) return;

    if (item.quantity >= getStock(id)) {
      setCartMessage(`Only ${getStock(id)} units are available.`);
      return;
    }

    setCart((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );

    setCartMessage('');
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    setCartMessage('');
  };

  // Place order and reduce stock
  const placeOrder = () => {
    if (cart.length === 0) {
      return {
        success: false,
        message: 'Your cart is empty.',
      };
    }

    for (const item of cart) {
      if (item.quantity > getStock(item.id)) {
        return {
          success: false,
          message: `${item.name} does not have enough stock.`,
        };
      }
    }

    const updatedStock = { ...stock };

    cart.forEach((item) => {
      updatedStock[item.id] =
        getStock(item.id) - item.quantity;
    });

    setStock(updatedStock);
    setCart([]);
    setCartMessage('');

    return { success: true };
  };

  // Clear cart without changing stock
  const clearCart = () => {
    setCart([]);
    setCartMessage('');
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        stock,
        getStock,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        placeOrder,
        totalItems,
        totalPrice,
        cartMessage,
        setCartMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
