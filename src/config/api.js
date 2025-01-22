import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, LOGIN_URL, REGISTER_URL } from "../config/constants";

// Membuat instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan Authorization header jika ada token
api.interceptors.request.use(
  async (config) => {
    // Cek jika URL request bukan login atau register
    if (!config.url.includes(LOGIN_URL) && !config.url.includes(REGISTER_URL)) {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        // Menambahkan token ke header Authorization
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Token expired or unauthorized. Redirecting to login...");
      await AsyncStorage.removeItem("authToken"); // Hapus token
      // Navigasi ke login screen jika menggunakan react-navigation
      navigation.replace("Login");
    }

    return Promise.reject(error);
  }
);

export default api;
