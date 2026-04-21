import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8082/cart")
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Cart Items</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.productId}</td>
              <td>{i.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}