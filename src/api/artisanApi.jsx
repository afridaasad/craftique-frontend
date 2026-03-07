import API from "../services/api";

export const getArtisanProducts = () =>
  API.get("/artisan/products/");

export const deleteArtisanProduct = (id) =>
  API.delete(`/artisan/products/${id}/`);

export const toggleProductActive = (id) =>
  API.patch(`/artisan/products/${id}/toggle-active/`);

export const updateArtisanProduct = (id, data) =>
  API.patch(`/artisan/products/${id}/`, data);