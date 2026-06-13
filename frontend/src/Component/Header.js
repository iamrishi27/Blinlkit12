import React from "react";

const Header = ({ siteName = "IntellMeet", role, logout, view, setView, cartCount = 0 }) => {
  return (
    <header className="app-header">
      <div />

      <div className="site-title">
        <h1>{siteName}</h1>
      </div>

      <div className="header-actions">
        {role === "admin" ? (
          <button onClick={() => setView("dashboard")} className="btn ghost">Admin Dashboard</button>
        ) : (
          <button onClick={() => setView("products")} className="btn ghost">Products</button>
        )}

        <button onClick={() => setView("cart")} className="btn ghost">
          Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>

        <button onClick={logout} className="btn ghost">Logout</button>
      </div>
    </header>
  );
};

export default Header;
