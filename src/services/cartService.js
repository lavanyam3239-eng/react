import axios from "axios";

const CART_URL = "http://localhost:8082/cart";

// 🔧 Create axios instance (optional but recommended)
const api = axios.create({
  baseURL: CART_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// 🛒 CREATE CART
export const createCart = async () => {
  try {
    const res = await api.post("");
    return res.data;
  } catch (err) {
    console.error("Create cart error:", err.response?.data || err.message);
    throw err;
  }
};

// ➕ ADD ITEM TO CART
export const addItemToCart = async (cartId, productId, quantity = 1) => {
  try {
    const res = await api.post("/add-item", {
      cartId: Number(cartId),
      productId: Number(productId),
      quantity
    });
    return res.data;
  } catch (err) {
    console.error("Add item error:", err.response?.data || err.message);
    throw err;
  }
};

// 📦 GET CART BY ID
export const getCart = async (cartId) => {
  try {
    const res = await api.get(`/${cartId}`);
    return res.data;
  } catch (err) {
    console.error("Get cart error:", err.response?.data || err.message);
    throw err;
  }
};

// ❌ DELETE ITEM FROM CART
export const deleteCartItem = async (itemId) => {
  try {
    const res = await api.delete(`/item/${itemId}`);
    return res.data;
  } catch (err) {
    console.error("Delete item error:", err.response?.data || err.message);
    throw err;
  }
};