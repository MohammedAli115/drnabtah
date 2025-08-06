// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://backend.drnabtah.com/api",
//   withCredentials: true, // This sends HttpOnly cookies automatically
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     config.headers["Accept"] = "application/json";
//     config.headers["device-type"] = "web";
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       error.response?.status === 403 &&
//       !originalRequest._retry
//     ) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           originalRequest.headers["Authorization"] = `Bearer ${token}`;
//           return api(originalRequest);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       return new Promise(async (resolve, reject) => {
//         try {
//           const token = localStorage.getItem("token");
//           if (!token) throw new Error("No refresh token found");

//           const { data } = await axios.post(
//             "https://backend.drnabtah.com/api/auth/refresh-token",
//             {},
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//               },
//             }
//           );

//           const newToken = data.token;
//           localStorage.setItem("token", newToken);
//           console.log("New token received:", localStorage.getItem("token"));

//           api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
//           originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//           console.log(newToken, "New token set in axios defaults");
//           processQueue(null, newToken);
//           resolve(api(originalRequest));
//         } catch (err) {
//           processQueue(err, null);
//           localStorage.removeItem("token");
//           localStorage.removeItem("refreshToken");
//           window.location.href = "/login";
//           reject(err);
//         } finally {
//           isRefreshing = false;
//         }
//       });
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
// src/api/api.js
import axios from "axios";
import { handleRefreshToken } from "./refreshToken";

const api = axios.create({
  baseURL: "https://backend.drnabtah.com/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept"] = "application/json";
    config.headers["device-type"] = "web";
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      return handleRefreshToken(error, originalRequest, api);
    }

    return Promise.reject(error);
  }
);

export default api;
