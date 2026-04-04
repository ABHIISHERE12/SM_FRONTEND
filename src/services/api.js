import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("savemore_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("savemore_token");
      localStorage.removeItem("savemore_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth API calls
export const authAPI = {
  register: (data) => apiClient.post("/auth/register", data),
  login: (data) => apiClient.post("/auth/login", data),
  logout: () => apiClient.post("/auth/logout"),
  getMe: () => apiClient.get("/auth/me"),
  updateProfile: (data) => apiClient.put("/auth/me", data),
};

// Goals API calls
export const goalsAPI = {
  getAll: (filters) => apiClient.get("/goals", { params: filters }),
  getOne: (id) => apiClient.get(`/goals/${id}`),
  create: (data) => apiClient.post("/goals", data),
  update: (id, data) => apiClient.put(`/goals/${id}`, data),
  delete: (id) => apiClient.delete(`/goals/${id}`),
  contribute: (id, data) => apiClient.patch(`/goals/${id}/contribute`, data),
  withdraw: (id, data) => apiClient.post(`/goals/${id}/withdraw`, data),
};

// Transactions API calls
export const transactionsAPI = {
  getAll: (filters) => apiClient.get("/transactions", { params: filters }),
  getOne: (id) => apiClient.get(`/transactions/${id}`),
  create: (data) => apiClient.post("/transactions", data),
  update: (id, data) => apiClient.put(`/transactions/${id}`, data),
  delete: (id) => apiClient.delete(`/transactions/${id}`),
  getMonthlySummary: (filters) =>
    apiClient.get("/transactions/summary/monthly", { params: filters }),
};

// Dashboard API calls
export const dashboardAPI = {
  getDashboard: () => apiClient.get("/dashboard"),
  getMonthlyTrend: () => apiClient.get("/dashboard/trend"),
};

// Cancel withdrawal
export const cancelWithdrawalAPI = (goalId, transactionId, reason) =>
  apiClient.post(`/goals/${goalId}/withdrawals/${transactionId}/cancel`, {
    reason,
  });

export default apiClient;
