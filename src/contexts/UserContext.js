// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getUserDataFromToken } from '../services/authService';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userIp, setUserIp] = useState('127.0.0.1');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserDataFromToken();
      if (userData) {
        setUser(userData);
      }
    };

    const fetchUserIp = async () => {
      try {
        const response = await axios.get('https://api64.ipify.org?format=json');
        setUserIp(response.data.ip);
      } catch (error) {
        console.error('Error fetching user IP:', error);
      }
    };

    fetchUserData();
    fetchUserIp();
  }, []);

  return (
    <UserContext.Provider value={{ user, userIp }}>
      {children}
    </UserContext.Provider>
  );
};
