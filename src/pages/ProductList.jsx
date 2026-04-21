import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import axios from "axios";

export default function ProductList() {
  const dispatch = useDispatch();

  // 🔥 Get data from Redux
  const { items: products = [], loading, error, totalPages } =
    useSelector((state) => state.products);

  // 🔍 Search & Filter
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🔥 Pagination
  const [page, setPage] = useState(0);
  const size = 5;

  // 🔥 Fetch data from backend
  useEffect(() => {
    dispatch(fetchProducts({ page, size }));
  }, [dispatch, page]);

  // 🔥 Filter + Search (optimized)
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

  // 🛒 Add to Cart
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
        <>
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

          {/* 🔥 PAGINATION */}
          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                style={{
                  margin: "0 5px",
                  fontWeight: page === i ? "bold" : "normal"
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}