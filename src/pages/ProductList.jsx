import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import axios from "axios";

export default function ProductList() {
  const dispatch = useDispatch();

  const { items: products = [], loading, error } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔥 useMemo for optimized filtering
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPrice =
        maxPrice === "" || p.price <= Number(maxPrice);

      return matchesSearch && matchesPrice;
    });
  }, [products, search, maxPrice]);

  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:8082/cart", {
        productId,
        quantity: 1
      });
      alert("Added to Cart ✅");
    } catch (err) {
      alert("Cart failed ❌");
    }
  };

  return (
    <div>
      <h2>Product List</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 💰 FILTER */}
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <br /><br />

      {/* 🔄 LOADING */}
      {loading && <p>Loading... ⏳</p>}

      {/* ❌ ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ TABLE */}
      {!loading && !error && (
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
            {filteredProducts.map((p) => (
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
      )}
    </div>
  );
}