import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");

    // ❗ If no cart yet
    if (!cartId) {
      console.log("No cart found");
      return;
    }

    // ✅ CORRECT API
    axios
      .get(`http://localhost:8082/cart/${cartId}`)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        console.error("Error loading cart:", err);
      });
  }, []);

  if (!cart) return <p>No Cart Found 🛒</p>;

  return (
    <div>
      <h2>Cart Page</h2>

      <h3>Cart ID: {cart.id}</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {cart.items?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.productId}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}