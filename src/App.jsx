import { Routes, Route, Link, Navigate } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Product App</h1>

      <nav>
        <Link to="/products">Products</Link> |{" "}
        <Link to="/add-product">Add Product</Link> |{" "}
        <Link to="/cart">Cart</Link>
      </nav>

      <hr />

      <Routes>
        {/* 🔥 DEFAULT ROUTE */}
        <Route path="/" element={<Navigate to="/products" />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}