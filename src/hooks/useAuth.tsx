import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import useApi from './useApi';

interface User {
  _id: string;
  name: string;
  email: string;
  settings?: {
    currency: string;
    theme: string;
    dateFormat: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserData: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  isAuthenticated: false,
  updateUserData: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const api = useApi();

  // Helper to check if user is logged in
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await api.get('/api/auth/me');
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
          return true;
        }
      }
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      return false;
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    // Check if user is logged in when component mounts
    const checkAuthStatus = async () => {
      setLoading(true);
      await checkAuth();
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post('/api/auth/login', { email, password });
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        setUser({
          _id: response._id,
          name: response.name,
          email: response.email,
          settings: response.settings
        });
        setIsAuthenticated(true);
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      console.log('Calling register API...');
      const response = await api.post('/api/auth/register', { name, email, password });
      console.log('Register API response:', response);
      
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        setUser({
          _id: response._id,
          name: response.name,
          email: response.email,
          settings: response.settings
        });
        console.log('User set in context after signup:', {
          _id: response._id,
          name: response.name,
          email: response.email
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserData = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      isAuthenticated,
      updateUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 