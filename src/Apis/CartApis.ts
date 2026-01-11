import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../Constants/baseUrl";

const BASE_URL = `${baseURL}/cart`;

const getHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    authentication: `bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// ===> 1️- View Cart
export const getCart = async () => {
  const headers = await getHeaders();
  const { data } = await axios.get(BASE_URL, { headers });
  return data;
};

// ===> 2️- Add To Cart
export const addToCart = async (productId: string, quantity: number = 1) => {
  const headers = await getHeaders();
  const { data } = await axios.post(
    BASE_URL,
    { productId, quantity },
    { headers }
  );
  return data;
};

// ===> 3️- Remove From Cart
export const removeFromCart = async (productId: string) => {
  const headers = await getHeaders();
  const { data } = await axios.put(
    `${BASE_URL}/deleteitem/${productId}`,
    {},
    { headers }
  );
  return data;
};

// ===> 4️- Clear Cart
export const clearCart = async () => {
  const headers = await getHeaders();
  const { data } = await axios.delete(BASE_URL, { headers });
  return data;
};

// ===> 5️- Update Quantity
export const updateCartQuantity = async (
  productId: string,
  quantity: number
) => {
  const headers = await getHeaders();
  const { data } = await axios.put(
    `${BASE_URL}/${productId}`,
    { quantity },
    { headers }
  );
  return data;
};
