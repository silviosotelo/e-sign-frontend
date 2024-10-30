// authService.js (src/services/authService.js)
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importación correcta


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

// Function to get user data from token
export const getUserId = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const user = jwtDecode(token);
      return user.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

// Function to get user data from token
export const getUserDataFromToken = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const user = jwtDecode(token);
      const response = await axios.get(`${backendUrl}/api/user/${user.userId}`);
      return response.data;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('token');
};
