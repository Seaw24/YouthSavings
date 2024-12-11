import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

const axiousPrivate = axios.create({
  headers: { "content-type": "application/json" },
});

export default axiousPrivate;
