import Axios from "axios";

// const axios = Axios.create({
//   baseURL: "http://192.168.18.13:3001/api/",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//   },
// });
//
//auth-ms-larvel 8000
const auth = Axios.create({
  baseURL: "http://3.85.216.85:9003/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, 
});

//inventory-ms-laravel 8001
const inventory = Axios.create({
  baseURL: "http://127.0.0.1:8001/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//sale-ms-laravel 8002
const sale = Axios.create({
  baseURL: "http://127.0.0.1:8002/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//report-ms-laravel 8003
const report = Axios.create({
  baseURL: "http://127.0.0.1:8003/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { auth, inventory, sale, report };
