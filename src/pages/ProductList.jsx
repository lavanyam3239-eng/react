import { useEffect } from "react"; // ✅ missing earlier
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import axios from "axios";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  // 🔥 Load products from Redux
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔥 Add to Cart API
  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:8082/cart", {
        productId: productId,
        quantity: 1
      });

      alert("Added to Cart ✅");
    } catch (error) {
      console.error("Cart Error 👉", error);
      alert("Failed to add to cart ❌");
    }
  };

  return (
    <div>
      <h2>Product List</h2>

      <p>Total Products: {products.length}</p>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => addToCart(p.id)}>
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}