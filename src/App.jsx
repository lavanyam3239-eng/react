import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Product App</h1>

      <nav>
        <Link to="/products">Products</Link> |{" "}
        <Link to="/add-product">Add Product</Link>
      </nav>

      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </div>
  );
}