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
  baseURL: "https://migracion.jadal.pe/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, 
});

//inventory-ms-laravel 8001
const inventory = Axios.create({
  baseURL: "https://migracion.jadal.pe/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//sale-ms-laravel 8002
const sale = Axios.create({
  baseURL: "https://migracion.jadal.pe/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//report-ms-laravel 8003
const report = Axios.create({
  baseURL: "https://migracion.jadal.pe/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//SIRE
const sire = Axios.create({
  baseURL: "http://report-centralizador-backend-sire.test/api/sire",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { auth, inventory, sale, report, sire };
