import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProductsCard from "./pages/ProductsCard";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import CartPage from "./pages/CartPage";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  const [page, setPage] = useState("login");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    setToken(null);
    setRole(null);
    setPage("login");
  };

  const [view, setView] = useState(
    role === "admin" ? "dashboard" : "products"
  );

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  const addToCart = (product) => {
    setCart((c) => {
      const found = c.find((it) => it.productId === product._id);
      if (found) {
        return c.map((it) => (it.productId === product._id ? { ...it, qty: it.qty + 1 } : it));
      }

      return [
        ...c,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ];
    });
  };

  useEffect(() => {
    setView(role === "admin" ? "dashboard" : "products");
  }, [role]);

  return (
    <>
      {!token ? (
        page === "login" ? (
          <Login
            setToken={setToken}
            setPage={setPage}
            setRole={setRole}
          />
        ) : (
          <Register setPage={setPage} />
        )
      ) : (
        <div>
          <Header siteName="IntellMeet" role={role} logout={logout} view={view} setView={setView} cartCount={cartCount} />

          <main>
            {role === "admin" && view === "dashboard" && (
              <Home logout={logout} setView={setView} />
            )}

            {view === "products" && (
              <ProductsCard logout={logout} setView={setView} addToCart={addToCart} />
            )}

            {view === "cart" && <CartPage cart={cart} setCart={setCart} setView={setView} />}
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;