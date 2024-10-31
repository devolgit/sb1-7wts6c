import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation, useNavigate, Location, NavigateFunction } from 'react-router-dom';
import toast from 'react-hot-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  location: Location;
  navigate: NavigateFunction;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      if (email === 'admin@nriservices.com' && password === 'admin123') {
        setIsAuthenticated(true);
        toast.success('Successfully logged in!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('An error occurred during login');
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    toast.success('Successfully logged out!');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, location, navigate }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}