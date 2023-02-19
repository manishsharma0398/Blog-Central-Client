import axios from "axios";

export const base_url = import.meta.env.VITE_BASE_URL;

let store;
export const injectStore = (_store) => {
  store = _store;
};

export const privateRequest = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

privateRequest.interceptors.request.use(function (config) {
  const token = store?.getState()?.auth?.currentUser?.token;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "application/json";
  return config;
});

export const publicRequest = axios.create({
  baseURL: base_url,
});
