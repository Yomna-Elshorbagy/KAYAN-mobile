import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../Constants/baseUrl";
import { ApiResponse, User, UsersOverview } from "../Interfaces/Iuser";

const BASE_URL = `${baseURL}/user`;

const getHeaders = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    authentication: `bearer ${token}`,
  };
};

// ===== User =====
export const getProfileAPI = async (): Promise<ApiResponse<User>> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/profile`, { headers });
  return data;
};

export const updateProfileAPI = async (
  formData: FormData
): Promise<ApiResponse<User>> => {
  // Merge auth headers with multipart content-type for file upload
  const headers = {
    ...(await getHeaders()),
    "Content-Type": "multipart/form-data",
  };
  const { data } = await axios.put(BASE_URL, formData, { headers });
  return data;
};

export const resetPasswordAPI = async (payload: {
  oldPassword: string;
  newPassword: string;
  Cpassword: string;
}): Promise<ApiResponse<null>> => {
  const headers = await getHeaders();
  const { data } = await axios.put(`${BASE_URL}/reset-pass`, payload, {
    headers,
  });
  return data;
};

export const softDeleteUserAPI = async (): Promise<ApiResponse<User>> => {
  const headers = await getHeaders();
  const { data } = await axios.delete(`${BASE_URL}/softDelete`, { headers });
  return data;
};

// ===== Admin / Dashboard =====
export const getAllUsersAPI = async (
  params: any
): Promise<ApiResponse<User[]>> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/allUsers`, {
    headers,
    params,
  });
  return data;
};

export const getUsersOverviewAPI = async (): Promise<
  ApiResponse<UsersOverview>
> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/analysis/overview`, {
    headers,
  });
  return data;
};

export const getDemographicsAPI = async (): Promise<ApiResponse<any>> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${BASE_URL}/analysis/demographics`, {
    headers,
  });
  return data;
};
