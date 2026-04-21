import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/productSlice";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const saveProduct = () => {
    dispatch(addProduct(product));
    alert("Product Added ✅");
    navigate("/products");
  };

  return (
    <div>
      <h2>Add Product</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <br /><br />

      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <br /><br />

      <input name="stock" type="number" placeholder="Stock" onChange={handleChange} />
      <br /><br />

      <button onClick={saveProduct}>Add Product</button>
    </div>
  );
}