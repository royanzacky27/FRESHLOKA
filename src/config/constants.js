const API_URL = "http://localhost:3001/api";
const LOGIN_URL = `${API_URL}/auth/login`;
const LOGOUT_URL = `${API_URL}/auth/logout`;
const AUTH_ME_URL = `${API_URL}/auth/me`;
const REGISTER_URL = `${API_URL}/auth/register`;
const PRODUCTS_URL = `${API_URL}/products`;
const FORGOT_PASSWORD_VALIDATE_URL = `${API_URL}/auth/forgot-password/validate`;
const FORGOT_PASSWORD_CHANGE_URL = `${API_URL}/auth/forgot-password/change`;

export {
  API_URL,
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
  PRODUCTS_URL,
  AUTH_ME_URL,
  FORGOT_PASSWORD_VALIDATE_URL,
  FORGOT_PASSWORD_CHANGE_URL,
};
