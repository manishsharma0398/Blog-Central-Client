import axios from "axios";
import { access_token } from "./token";

export const base_url = "http://localhost:5001/api";

export const makeRequest = axios.create({
  baseURL: base_url,
});

export const axiosHeader = {
  headers: {
    Authorization: `Bearer ${access_token()}`,
    Accept: "application/json",
  },
};
