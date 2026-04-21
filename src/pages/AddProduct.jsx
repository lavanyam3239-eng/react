import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const saveProduct = () => {
    axios.post("http://localhost:8081/products", product)
      .then(() => {
        alert("Product Added ✅");
        navigate("/products"); // redirect to list
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Add Product</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="price"
        placeholder="Price"
        type="number"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="stock"
        placeholder="Stock"
        type="number"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={saveProduct}>Add Product</button>
    </div>
  );
}