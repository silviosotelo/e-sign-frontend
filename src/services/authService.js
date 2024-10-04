// authService.js (src/services/authService.js)
import axios from 'axios';

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

export const logout = () => {
  localStorage.removeItem('token');
};
