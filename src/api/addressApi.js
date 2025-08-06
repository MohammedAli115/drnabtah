// src/api/addressApi.js
import api from "./axios";

export const createAddress = (addressData) =>
  api.post("/addresses", addressData);
export const updateAddress = (id, addressData) =>
  api.post(`/addresses/${id}`, addressData);
export const deleteAddress = (id) => api.delete(`/addresses/${id}`);
export const getUserAddresses = () => api.get("/addresses/user");
export const getAddressById = (id) => api.get(`/addresses/${id}`);
