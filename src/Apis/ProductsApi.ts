import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../Constants/baseUrl";
import { IProduct, IProductStats, IRelatedProduct } from "../Interfaces/Iproducts";

const BASE_URL = `${baseURL}/products`;

const getHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    authentication: `bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getProducts = async (
  page: number = 1,
  size: number = 6,
  search?: string,
  category?: string
): Promise<{
  success: boolean;
  results: number;
  data: IProduct[];
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    prevPage: number | null;
  };
}> => {
  const params: Record<string, any> = { page, size };
  if (search) params.keyword = search;
  if (category) params.category = category;

  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/getproducts`, {
    headers,
    params,
  });
  return data;
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/${id}`, { headers });
  return data.data;
};

export const addProduct = async (formData: FormData): Promise<IProduct> => {
  const token = await AsyncStorage.getItem("accessToken");
  const { data } = await axios.post(`${BASE_URL}/`, formData, {
    headers: {
      authentication: `bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

export const updateProduct = async (
  id: string,
  formData: FormData
): Promise<IProduct> => {
  const token = await AsyncStorage.getItem("accessToken");
  const { data } = await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: {
      authentication: `bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

// === Delete product
export const deleteProduct = async (id: string): Promise<any> => {
  const headers = await getHeaders();
  const { data } = await axios.delete(`${BASE_URL}/${id}`, { headers });
  return data;
};

export const softDeleteProducts = async (
  id: string,
  token: string
): Promise<any> => {
  const { data } = await axios.put(
    `${BASE_URL}/soft/${id}`,
    {},
    {
      headers: { authentication: `bearer ${token}` },
    }
  );
  return data;
};

// === Get trending products
export const getTrendingProducts = async (): Promise<IProduct[]> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/trending`, { headers });
  return data.trendingProducts;
};

export const getRelatedProducts = async (
  productId: string
): Promise<IRelatedProduct[]> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/related/${productId}`, {
    headers,
  });
  return data.relatedProducts;
};

export const getLowStockProducts = async (
  threshold: number = 10
): Promise<IProduct[]> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/lowstock`, {
    headers,
    params: { threshold },
  });
  return data.products;
};

export const contactProductOwner = async (productId: string) => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/contact/${productId}`, {
    headers,
  });
  return data.chatDetails;
};

export const getProductStats = async (): Promise<IProductStats> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/analytics/stats`, { headers });
  return data.data;
};

export const getTopSellingProducts = async () => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/topSelling`, {
    headers,
  });
  return data.data;
};