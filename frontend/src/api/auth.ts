import { API_URL } from "@/config/config";
import axios from "axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const loginUser = async (
  data: LoginRequest
): Promise<LoginResponse | null> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}auth/login`, data);
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    return null;
  }
};

export const logoutUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

