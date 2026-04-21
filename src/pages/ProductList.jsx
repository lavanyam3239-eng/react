import { useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";

export default function ProductList() {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(0);
  const size = 5;

  // 🔥 clean hooks
  const { products, loading, error, totalPages } =
    useProducts(page, size);

  const { addToCart } = useCart();

  // 🔥 filter logic
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

  return (
    <div>
      <h2>Product List</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <br /><br />

      {loading && <p>Loading... ⏳</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button
                        onClick={() => addToCart(p.id)}
                        disabled={p.stock === 0}
                      >
                        {p.stock === 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No products found</td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i)}>
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