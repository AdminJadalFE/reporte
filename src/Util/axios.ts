import Axios from 'axios';

// const axios = Axios.create({
//   baseURL: "http://192.168.18.13:3001/api/",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//   },
// });

const auth = Axios.create({
  baseURL: "http://127.0.0.1:8000/",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

const inventory = Axios.create({
  baseURL: "http://127.0.0.1:8001/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

const sale = Axios.create({
  baseURL: "http://127.0.0.1:8002/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export { auth, inventory, sale };
