import API from "../services/api";

// CART
export const getCart = () => API.get("/buyer/cart/");

export const removeCartItem = (id) =>
  API.delete(`/buyer/cart/${id}/`);

export const initiateCheckout = () =>
  API.post("/buyer/cart/checkout-initiate/");

export const confirmCheckout = (data) =>
  API.post("/buyer/cart/checkout-confirm/", data);

// WISHLIST
export const getWishlist = () =>
  API.get("/buyer/wishlist/");

export const removeWishlistItem = (productId) =>
  API.delete(`/buyer/wishlist/${productId}/`);