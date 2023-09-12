import { getCookie } from "@/utils/cookie";
import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
  timeout: 10000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie("accessToken");

    const _config: InternalAxiosRequestConfig<any> = Object.assign(config, {
      headers: {
        ...config.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      },
    });

    return _config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export default axiosInstance;
