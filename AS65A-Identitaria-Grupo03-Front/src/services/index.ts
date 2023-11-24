import axios from "axios";
// import { deleteJwtToken, deleteUser, getJwtToken } from "../utils/token";

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    // Authorization: `Bearer ${getJwtToken()}`,
    "x-api-version": 1,
  },
});

Api.interceptors.response.use(
  (value) => {
    return value;
  },
  async (error) => {
    if (error?.response && error.response.status === 401) {
      try {
        window.localStorage.clear();
        // if (!window.location.href.endsWith("/login")) {
        //   window.location.reload();
        // }
      } catch (err) {
        //
      }
    }
    return await Promise.reject(error);
  }
);

// Api.interceptors.request.use(
//   (config) => {
//     // const token = getJwtToken();
//     const modifiedConfig = config;

//     modifiedConfig.headers = config.headers ?? {};

//     // if (token) {
//     //   modifiedConfig.headers.Authorization = `Bearer ${token}`;
//     // }

//     return modifiedConfig;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

export default Api;
