/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  // Fetching data using AXIOS
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Adding products to cart and local storage (Global state not implemented yet)
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemExists = cart.find((item) => item.id === product.id);
    if (!itemExists) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart");
    } else {
      alert("Product is already in the cart");
    }
  };

  return (
    <div className="app">
      <Navbar />
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <h1>Fake Cart</h1>
        <Link className="cart-button" to="/cart">
          Go to Cart
        </Link>
      </div>
    </nav>
  );
}

function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <div className="price">
        <p>${product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Products;
