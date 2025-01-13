import React from 'react';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { Users } from 'lucide-react';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-blue-600 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-2 text-center">
                Please sign in to access the Employee Management System
              </p>
            </div>
            <LoginForm />
            <div className="mt-6 text-center text-sm text-gray-600">
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;