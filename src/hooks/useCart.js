import { createCart, addItemToCart } from "../services/cartService";

export const useCart = () => {
  const addToCart = async (productId) => {
    try {
      let cartId = localStorage.getItem("cartId");

      // create cart
      if (!cartId) {
        const cart = await createCart();
        cartId = cart.id;
        localStorage.setItem("cartId", cartId);
      }

      // add item
      await addItemToCart(cartId, productId);

      alert("Added to Cart ✅");

    } catch (err) {
      console.error(err);
      alert("Cart failed ❌");
    }
  };

  return { addToCart };
};