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

// ORDERS
export const getBuyerOrders = () =>
  API.get("/buyer/orders/");

// PRODUCTS
export const getProducts = (params) =>
  API.get("/products/", { params });

// PRODUCT DETAILS
export const getProductDetails = (id) =>
  API.get(`/products/${id}/`);

// CART
export const addToCart = (data) =>
  API.post("/buyer/cart/", data);

// WISHLIST
export const addToWishlist = (data) =>
  API.post("/buyer/wishlist/", data);