import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "../pages/ProductList";
import AddProduct from "../pages/AddProduct";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;