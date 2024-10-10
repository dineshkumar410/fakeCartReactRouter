import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
