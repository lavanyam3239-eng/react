import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";

export const useProducts = (page, size) => {
  const dispatch = useDispatch();

  const { items, loading, error, totalPages } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page, size }));
  }, [dispatch, page, size]);

  return {
    products: items || [],
    loading,
    error,
    totalPages
  };
};