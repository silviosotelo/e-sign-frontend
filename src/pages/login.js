// src/pages/login.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../services/authService';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000); // Esperar 3 segundos antes de redirigir al dashboard
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLoading ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Hola, un gusto que estés aquí 😊</h2>
          <p className="text-gray-600 mb-4">Te estamos redirigiendo...</p>
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500 mt-4" />
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
