import React, { useEffect, useState } from "react";
import API from "../Api/axios";

const ProductsCard = ({ logout, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [added, setAdded] = useState({});
  const [page, setPage] = useState(0);
  const pageSize = 25; // 5 columns x 5 rows

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // if products shrink, ensure page is in range
    const total = Math.ceil(products.length / pageSize);
    if (page >= total && total > 0) setPage(total - 1);
  }, [products, page]);

  const backendBase = API.defaults.baseURL.replace("/api", "");

  const saveProduct = async (product) => {
    // add to client-side cart
    try {
      addToCart(product);
      setAdded((s) => ({ ...s, [product._id]: true }));
      setTimeout(() => setAdded((s) => ({ ...s, [product._id]: false })), 900);
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const start = page * pageSize;
  const pageItems = products.slice(start, start + pageSize);

  const goToPage = (p) => setPage(p);

  return (
    <div className="container">
      <h2>Products</h2>

      <div className="products-grid">
        {pageItems.map((p) => (
          <div key={p._id} className="product-card card">
            {p.image && (
              <img src={p.image.startsWith("/") ? backendBase + p.image : p.image} alt={p.name} />
            )}

            <div className="card-body">
              <div>
                <h4>{p.name}</h4>
                <p>₹{p.price}</p>
                {p.info && <p style={{ fontSize: 13 }}>{p.info}</p>}
              </div>

              <div>
                <button className="btn" onClick={() => saveProduct(p)}>{added[p._id] ? "Added" : "Add to Cart"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="page-btn" onClick={() => goToPage(Math.max(0, page - 1))} disabled={page === 0}>Prev</button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} className={`page-btn ${i === page ? 'active' : ''}`} onClick={() => goToPage(i)}>{i + 1}</button>
        ))}

        <button className="page-btn" onClick={() => goToPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}>Next</button>
      </div>
    </div>
  );
};

export default ProductsCard;
