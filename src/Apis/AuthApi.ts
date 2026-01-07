import axios from "axios";
import { baseURL } from "../Constants/baseUrl";

const API = axios.create({
  baseURL: `${baseURL}/auth`,
});

export const loginApi = (data: any) =>
  API.post("/login", data);

export const signupApi = (data: any) =>
  API.post("/signup", data);
