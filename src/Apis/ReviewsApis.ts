import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../Constants/baseUrl";

const BASE_URL = `${baseURL}/reviews`;

const getHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    authentication: `bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// ================= USER =================

// ===> 1- Add or update review
export const addReview = async (
  product: string,
  rate: number,
  comment: string
) => {
  const headers = await getHeaders();
  const { data } = await axios.post(
    `${BASE_URL}/addReview`,
    { product, rate, comment },
    { headers }
  );
  return data;
};

// ===> 2- Update review (same logic as backend)
export const updateReview = async (
  product: string,
  rate: number,
  comment: string
) => {
  const headers = await getHeaders();
  const { data } = await axios.put(
    `${BASE_URL}/updateReview`,
    { product, rate, comment },
    { headers }
  );
  return data;
};

// ===> 3- Get logged-in user reviews
export const getUserReviews = async () => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/userReviews`, { headers });
  return data;
};

// ===> 4- Get product reviews
export const getProductReviews = async (productId: string) => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/productReviews/${productId}`, {
    headers,
  });
  return data;
};

// ================= ADMIN =================

// ===> 5- Get all reviews
export const getAllReviews = async (query = "") => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}${query}`, { headers });
  return data;
};

// ===> 6- Soft delete review
export const softDeleteReview = async (reviewId: string) => {
  const headers = await getHeaders();
  const { data } = await axios.put(`${BASE_URL}/${reviewId}`, {}, { headers });
  return data;
};

// ===> 7- Delete review permanently
export const deleteReview = async (reviewId: string) => {
  const headers = await getHeaders();
  const { data } = await axios.delete(`${BASE_URL}/${reviewId}`, { headers });
  return data;
};

// ===> 8- Get reviews with contacts (ADMIN)
export const getProductReviewsWithContacts = async (productId: string) => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/with-contacts/${productId}`, {
    headers,
  });
  return data;
};

// ===> 10- Contact review user
export const contactReviewUser = async (
  reviewId: string,
  subject: string,
  message: string
) => {
  const headers = await getHeaders();
  const { data } = await axios.post(
    `${BASE_URL}/contact-user/${reviewId}`,
    { subject, message },
    { headers }
  );
  return data;
};
