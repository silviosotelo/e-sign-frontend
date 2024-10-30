// src/components/Layout.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';
import { getUserDataFromToken } from '../services/authService';

const Layout = ({ children, pageTitle }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [userIp, setUserIp] = useState('127.0.0.1');

  // Obtener los datos del usuario del token JWT
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserDataFromToken(); // Esperar la resolución de la promesa
      if (userData) {
        setUser(userData);
      }
    };

    fetchUserData();
  }, []);

  // Obtener la IP del usuario
  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        const response = await axios.get('https://api64.ipify.org?format=json');
        setUserIp(response.data.ip);
      } catch (error) {
        console.error('Error fetching user IP:', error);
      }
    };
    fetchUserIp();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useAuth(); // Llama al hook para verificar la autenticación solo después del montaje


  if (!isMounted) {
    // No mostrar nada hasta que el componente esté montado
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-md p-5">
        <h2 className="text-2xl font-bold mb-8">e-Sign</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/contracts" className="text-gray-700 hover:text-blue-600 font-medium">
              Contracts
            </Link>
          </li>
          <li>
            <Link href="/settings" className="text-gray-700 hover:text-blue-600 font-medium">
              Settings
            </Link>
          </li>
          <li>
            <Link href="/logout" className="text-gray-700 hover:text-blue-600 font-medium">
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="bg-white p-4 shadow-md mb-8 rounded-lg">
          <h1 className="text-xl font-semibold">
            {user ? `Hola ${user.name || user.email}👋, bienvenido!` : pageTitle}
          </h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
