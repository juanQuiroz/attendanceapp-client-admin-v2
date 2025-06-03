import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors para auth, etc.
apiClient.interceptors.request.use((config) => {
  // Agregar token de auth si existe
  return config;
});
