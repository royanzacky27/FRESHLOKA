const API_URL = "http://localhost:3001/api";
const LOGIN_URL = `${API_URL}/auth/login`;
const LOGOUT_URL = `${API_URL}/auth/logout`;
const AUTH_ME_URL = `${API_URL}/auth/me`;
const REGISTER_URL = `${API_URL}/auth/register`;
const FORGOT_PASSWORD_VALIDATE_URL = `${API_URL}/auth/forgot-password/validate`;
const FORGOT_PASSWORD_CHANGE_URL = `${API_URL}/auth/forgot-password/change`;
const CATEGORY_URL = `${API_URL}/categories`;
const PRODUCTS_URL = `${API_URL}/products`;
const CART_URL = `${API_URL}/carts`;

export {
  API_URL,
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
  AUTH_ME_URL,
  FORGOT_PASSWORD_VALIDATE_URL,
  FORGOT_PASSWORD_CHANGE_URL,
  CATEGORY_URL,
  PRODUCTS_URL,
  CART_URL,
};
