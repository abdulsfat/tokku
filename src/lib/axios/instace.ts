import axios from "axios";

const headers = {
  Accept: "aplication/json",
  "Content-Type": "aplication/json",
  "Cache-Control": "no-cache",
  Expires: 0,
};

const instace = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers,
  timeout: 60 * 1000,
});

instace.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instace.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instace;
