import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Rendering cart items using local storage (global state not implemented yet)
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Removing cart items with respect to the id and updating state(local storage)
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Quantity updated and rendering item only if quantity is more than 0
  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Total calculated with 10% discount applied
  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return total * 0.9;
  };

  // Conditionally rendering everything
  return (
    <div className="cart">
      <Navbar />
      {cartItems.length === 0 ? (
        <div className="empty">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="cartItem">
                  <img src={item.image} alt={item.title} />
                  <h2>{item.title}</h2>
                  <p className="priceCart">${item.price}</p>
                </div>
                <div className="cartItem">
                  <p>Quantity: {item.quantity}</p>
                  <div className="btns">
                    <button
                      className="quantityBtn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <button
                      className="quantityBtn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)}>
                  Remove from Cart
                </button>
              </li>
            ))}
          </ul>
          <div className="total">
            <h2>
              Total Price:{" "}
              <span className="priceCart">${calculateTotal().toFixed(2)}</span>
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <h1>Your Cart</h1>
        <Link className="cart-button" to="/">
          Go back to products
        </Link>
      </div>
    </nav>
  );
}

export default Cart;
