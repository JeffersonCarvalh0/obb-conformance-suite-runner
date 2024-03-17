import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const apiClient = axios.create({
  baseURL: process.env.CERTIFICATION_API_URL,
  httpsAgent,
});
