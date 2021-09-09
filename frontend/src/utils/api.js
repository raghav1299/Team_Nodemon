import axios from "axios";
import config from "./config.json";

export const postRequest = (path, data) => {
  return axios.post(`${config.baseUrl}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const patchRequest = (path, data) => {
  return axios.patch(`${config.baseUrl}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const getRequest = (path) => {
  return axios.get(`${config.baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

// export const headRequest = (path) => {
//   return axios.head(`${config.baseUrl}${path}`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

// export const multiGetRequest = async (paths) => {
//   let arr = [];

//   paths.forEach((item) => {
//     arr.push(
//       axios.get(`${config.baseUrl}${item}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       })
//     );
//   });
//   return axios.all(arr);
// };

// export const multiPostRequest = async (configs) => {
//   let arr = [];
//   const authToken = localStorage.getItem("authToken");
//   configs.forEach((item) => {
//     arr.push(
//       axios.post(`${config.baseUrl}${item.url}`, item.data, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })
//     );
//   });
//   return axios.all(arr);
// };
