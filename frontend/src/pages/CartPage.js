import React from "react";
import API from "../Api/axios";

const CartPage = ({ cart, setCart, setView }) => {
  const removeItem = (id) => {
    setCart((c) => c.filter((it) => it.productId !== id));
  };

  const changeQty = (id, delta) => {
    setCart((c) =>
      c.map((it) =>
        it.productId === id
          ? { ...it, qty: Math.max(1, it.qty + delta) }
          : it
      )
    );
  };

  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);

  const backendBase = API.defaults.baseURL.replace("/api", "");

  const checkout = () => {
    if (cart.length === 0) return alert("Cart is empty");
    // placeholder checkout
    alert(`Checked out ${cart.length} items. Total ₹${total}`);
    setCart([]);
    setView("products");
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((it) => (
        <div key={it.productId} className="cart-item">
          {it.image && <img src={it.image.startsWith("/") ? backendBase + it.image : it.image} alt={it.name} />}

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{it.name}</div>
            <div>₹{it.price}</div>
            <div className="qty-control">
              <button className="btn ghost" onClick={() => changeQty(it.productId, -1)}>-</button>
              <div style={{ padding: "4px 8px" }}>{it.qty}</div>
              <button className="btn ghost" onClick={() => changeQty(it.productId, 1)}>+</button>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div>₹{it.price * it.qty}</div>
            <button className="btn ghost" onClick={() => removeItem(it.productId)}>Remove</button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 12 }}>
        <strong>Total: ₹{total}</strong>
      </div>

      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={checkout}>Checkout</button>
        <button className="btn ghost" onClick={() => setView("products")} style={{ marginLeft: 8 }}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default CartPage;
