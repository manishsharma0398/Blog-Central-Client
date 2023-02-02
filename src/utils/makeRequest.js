import axios from "axios";
import { base_url } from "./base_url";

const instance = axios.create({
  baseURL: base_url,
});

export default instance;
