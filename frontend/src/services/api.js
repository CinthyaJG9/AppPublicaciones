import axios from 'axios';
import { getToken } from './auth';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor para enviar token automáticamente
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getPosts = () => API.get('/posts');
export const createPost = (data) => API.post('/posts', data);
export const getPostById = (id) => API.get(`/posts/${id}`);