// src/services/api.js
import axios from "axios";
import { store } from "../store/store"; // Correct path and named import
import { logout } from '../features/auth/authSlice';

const API_BASE_URL = "https://backend.tecflow.kr";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // You might want to dispatch a logout action here
      
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

// Chat History API
export const createChatHistory = async (data) => {
  try {
    const response = await api.post("/chat-history", data);
    console.log("Response data for new chat: ", response.data.chat)
    return response.data.chat;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create chat");
  }
};

export const getChatHistory = async () => {
  try {
    console.log("Before fetching data!")
    const response = await api.get("/chat-history");
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch chats");
  }
};

export const getSingleChatHistory = async (id) => {
  try {
    const response = await api.get(`/chat-history/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch chat");
  }
};

export const updateChatHistory = async (id, data) => {
  try {
    const response = await api.put(`/chat-history/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update chat");
  }
};

export const deleteChatHistory = async (id) => {
  try {
    await api.delete(`/chat-history/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete chat");
  }
};
