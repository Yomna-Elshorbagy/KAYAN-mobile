import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../Constants/baseUrl";
import { IProduct } from "../Interfaces/Iproducts";

const BASE_URL = `${baseURL}/wishlist`;

const getHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    authentication: `bearer ${token}`,
    "Content-Type": "application/json",
  };
};

//===> 1- Get logged user wishlist
export const getWishlist = async (): Promise<IProduct[]> => {
  const headers = await getHeaders();
  const { data } = await axios.get(BASE_URL, { headers });
  return data.data.wishlist;
};

//===> 2- Add product to wishlist
export const addToWishlist = async (productId: string): Promise<IProduct[]> => {
  const headers = await getHeaders();
  await axios.put(BASE_URL, { productId }, { headers });
  return await getWishlist(); // Re-fetch to get populated product data
};

//===> 3- Remove product from wishlist
export const removeFromWishlist = async (
  productId: string
): Promise<IProduct[]> => {
  const headers = await getHeaders();
  await axios.put(`${BASE_URL}/${productId}`, {}, { headers });
  return await getWishlist();
};

//===> 4- Clear wishlist
export const clearWishlist = async (): Promise<IProduct[]> => {
  const headers = await getHeaders();
  await axios.put(`${BASE_URL}/clear`, {}, { headers });
  return await getWishlist();
};
