import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ME_URL, LOGIN_URL, LOGOUT_URL } from "../config/constants";
import axios from "axios";
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    };
    loadToken();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(LOGIN_URL, { email, password });
    const result = response.data;
    const newToken = result.data.token;
    if (response.status === 200 && result.data.token) {
      await AsyncStorage.setItem("authToken", newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      return result;
    }
    return null;
  };

  const logout = async (token, navigation) => {
    const response = await axios.get(LOGOUT_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    if (response.status === 200) {
      navigation.replace("Auth");
      Alert.alert("Logout", "Successfully!");
      // return result;
    } else {
      // return null;
      Alert.alert("Logout", "Failed!");
    }
  };

  const authMe = async (token) => {
    const response = await axios.get(AUTH_ME_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    if (response.status === 200) {
      return result;
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, authMe }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook untuk menggunakan AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
