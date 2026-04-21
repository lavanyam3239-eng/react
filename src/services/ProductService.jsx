import axios from "axios";

const API_URL = "http://localhost:8081/products";

export const getProducts = async () => {
  return await axios.get(API_URL);
};

export const createProduct = async (product) => {
  return await axios.post(API_URL, product);
};