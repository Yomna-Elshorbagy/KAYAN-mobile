import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../Constants/baseUrl";

const BASE_URL = `${baseURL}/order`;

const getHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    authentication: `bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// ================= USER APIs =================

// ===> 1- Create Order
export const createOrder = async (payload: {
  fullName: string;
  address?: string;
  phone: string;
  couponCode?: string;
}) => {
  const headers = await getHeaders();
  const { data } = await axios.post(BASE_URL, payload, { headers });
  return data;
};

// ===> 2- Create Order With Location
export const createOrderWithLocation = async (payload: {
  fullName: string;
  phone: string;
  address?: string;
  location?: {
    latitude: number;
    longitude: number;
    description?: string;
  };
}) => {
  const headers = await getHeaders();
  const { data } = await axios.post(`${BASE_URL}/with-location`, payload, {
    headers,
  });
  return data;
};

// ===> 3- Get User Orders
export const getUserOrders = async () => {
  const headers = await getHeaders();
  const { data } = await axios.get(BASE_URL, { headers });
  return data;
};

// ===> 4- Get Order Details
export const getOrderDetails = async (orderId: string) => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/${orderId}`, { headers });
  return data;
};

// ================= ADMIN APIs =================

// ===> 5- Get All Orders (pagination)
export const getAllOrders = async (page = 1, limit = 10) => {
  const headers = await getHeaders();
  const { data } = await axios.get(
    `${BASE_URL}/allorders?page=${page}&limit=${limit}`,
    { headers }
  );
  return data;
};

// ===> 6- Update Order
export const updateOrder = async (
  orderId: string,
  payload: {
    fullName?: string;
    phone?: string;
    address?: string;
    status?: string;
    finalPrice?: number;
  }
) => {
  const headers = await getHeaders();
  const { data } = await axios.put(`${BASE_URL}/${orderId}`, payload, {
    headers,
  });
  return data;
};

// ===> 7- Update Order Status (ADMIN)
export const updateOrderStatus = async (orderId: string, status: string) => {
  const headers = await getHeaders();
  const { data } = await axios.put(
    `${BASE_URL}/status/${orderId}`,
    { status },
    { headers }
  );
  return data;
};

// ===> 8- Soft Delete Order
export const softDeleteOrder = async (orderId: string) => {
  const headers = await getHeaders();
  const { data } = await axios.put(
    `${BASE_URL}/soft/${orderId}`,
    {},
    { headers }
  );
  return data;
};

// ===> 9- Hard Delete Order
export const hardDeleteOrder = async (orderId: string) => {
  const headers = await getHeaders();
  const { data } = await axios.delete(`${BASE_URL}/hard/${orderId}`, {
    headers,
  });
  return data;
};

// ================= REPORTS =================

// ===> 10- Revenue Per Month
export const getRevenuePerMonth = async () => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/revenue`, { headers });
  return data;
};

// ===> 11- Orders Distribution
export const getOrdersDistribution = async () => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/orderDistrbuted`, { headers });
  return data;
};

// ===> 12- Export CSV
export const exportOrdersCSV = async () => {
  const headers = await getHeaders();
  const response = await axios.get(`${BASE_URL}/exportcsv`, {
    headers,
    responseType: "blob",
  });
  return response;
};

// ===> 13- Export PDF
export const exportOrdersPDF = async () => {
  const headers = await getHeaders();
  const response = await axios.get(`${BASE_URL}/exportpdf`, {
    headers,
    responseType: "blob",
  });
  return response;
};
