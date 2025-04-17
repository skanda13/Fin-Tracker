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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  // Helper to check if user is logged in
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await api.get('/api/users/me');
        if (userData) {
          setUser(userData);
          return true;
        } else {
          localStorage.removeItem('token');
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
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
      console.log('Calling login API...');
      const response = await api.post('/api/auth/login', { email, password });
      console.log('Login API response:', response);
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        setUser({
          _id: response._id,
          name: response.name,
          email: response.email,
          settings: response.settings
        });
        console.log('User set in context:', {
          _id: response._id,
          name: response.name,
          email: response.email
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
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
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 