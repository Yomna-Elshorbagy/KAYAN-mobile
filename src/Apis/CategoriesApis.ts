import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../Constants/baseUrl";

const BASE_URL = `${baseURL}/categories`;

const getHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    authentication: `bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Get categories (pagination, search, filter)
export const getCategories = async (params?: any) => {
  const { data } = await axios.get(BASE_URL, { params });
  return data;
};

// Get all categories (no pagination)
export const getAllCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/all`);
  return data;
};

// Get category by ID
export const getCategoryById = async (id: string) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data;
};

// Get products by category ID
export const getProductsByCategory = async (
  categoryId: string,
  params?: any
) => {
  const { data } = await axios.get(`${BASE_URL}/${categoryId}/products`, {
    params,
  });
  return data;
};

// ===> Dashboard / Analytics APIs

// Trending categories
export const getTrendingCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/trending`);
  return data;
};

// Category stats
export const getCategoryStats = async () => {
  const { data } = await axios.get(`${BASE_URL}/stats`);
  return data;
};

// Revenue distribution per category
export const getRevenueDistribution = async () => {
  const { data } = await axios.get(`${BASE_URL}/revenue`);
  return data;
};

// ==> Admin APIs

// Create category (image upload)
export const createCategory = async (formData: FormData) => {
  const headers = await getHeaders();
  const { data } = await axios.post(BASE_URL, formData, {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// Update category
export const updateCategory = async (id: string, formData: FormData) => {
  const headers = await getHeaders();
  const { data } = await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// Soft delete category
export const softDeleteCategory = async (id: string) => {
  const headers = await getHeaders();
  const { data } = await axios.patch(
    `${BASE_URL}/${id}/soft-delete`,
    {},
    { headers }
  );
  return data;
};

// Hard delete category
export const deleteCategory = async (id: string) => {
  const headers = await getHeaders();
  const { data } = await axios.delete(`${BASE_URL}/${id}`, { headers });
  return data;
};
