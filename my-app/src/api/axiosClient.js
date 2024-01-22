import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://localhost:7258/api',
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    },
});

axiosClient.interceptors.response.use(
  res => res,
  error => {
      if (error.response.status === 401) {
          window.location.href = `http://localhost:3000/signup`;
      }
      console.error(`Error! Status Code: ` + error.response.status);
      return Promise.reject(error);
  }
);
// Add a request interceptor
// axiosClient.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// // Add a response interceptor
// axiosClient.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response.data;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });

export default axiosClient;