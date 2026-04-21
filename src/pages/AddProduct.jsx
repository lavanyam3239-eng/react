import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/productSlice";

function AddProduct() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} />
        <input name="stock" placeholder="Stock" onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProduct;