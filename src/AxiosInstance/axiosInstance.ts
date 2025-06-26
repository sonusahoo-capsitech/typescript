import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL
const BASE_URL = "https://localhost:7256"; 

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;


export default axiosInstance;