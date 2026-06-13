import React, { useEffect, useState, useRef } from "react";
import API from "../Api/axios";

const Home = ({ logout }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
    info: "",
  });
  const fileRef = useRef();

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

  const [usersProducts, setUsersProducts] = useState([]);
  const [showUsersProducts, setShowUsersProducts] = useState(false);

  const fetchUsersProducts = async () => {
    try {
      const res = await API.get("/users/products/all");
      setUsersProducts(res.data);
      setShowUsersProducts(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch users products");
    }
  };

  const backendBase = API.defaults.baseURL.replace("/api", "");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
      return;
    }

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("price", Number(form.price));
      data.append("info", form.info);
      if (form.image) data.append("image", form.image);

      await API.post("/products/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({
        name: "",
        price: "",
        image: null,
        info: "",
      });
      if (fileRef.current) fileRef.current.value = null;

      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="container dashboard">
      <h2>Product Dashboard</h2>
      <form onSubmit={addProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          ref={fileRef}
          onChange={handleChange}
        />

        <textarea
          name="info"
          placeholder="Product information"
          value={form.info}
          onChange={handleChange}
        />

        <button type="submit" className="btn">Add Product</button>
      </form>

      <hr />

      <div>
        <button onClick={fetchUsersProducts} className="btn ghost">
          View Users' Products (Admin)
        </button>

        {showUsersProducts && (
          <div style={{ marginTop: 12 }}>
            {usersProducts.map((u) => (
              <div key={u.id} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                <strong>{u.name}</strong> ({u.email}) - {u.count} products

                <div className="user-products">
                  {u.products.map((p) => (
                    <div key={p._id} className="small-card">
                      {p.image && <img src={p.image.startsWith("/") ? backendBase + p.image : p.image} alt={p.name} />}
                      <div style={{ fontSize: 13 }}>{p.name}</div>
                      <div style={{ fontSize: 12 }}>₹{p.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {products.map((product) => (
        <div key={product._id} className="product-card card">
          {product.image && (
            <img src={product.image.startsWith("/") ? backendBase + product.image : product.image} alt={product.name} />
          )}

          <div className="card-body">
            <div>
              <h4>{product.name} - ₹{product.price}</h4>
              {product.info && <p>{product.info}</p>}
            </div>

            <div>
              <button className="btn warn" onClick={() => deleteProduct(product._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;