import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9900/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
