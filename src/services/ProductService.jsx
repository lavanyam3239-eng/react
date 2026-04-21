import axios from "axios";

const API_URL = "http://localhost:8081/products";

export const getProducts = async (page, size) => {
  const res = await axios.get(`${API_URL}?page=${page}&size=${size}`);
  return res.data;
};

export const createProduct = async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};