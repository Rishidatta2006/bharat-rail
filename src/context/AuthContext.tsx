
import { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate login functionality
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would call an API to authenticate
    try {
      console.log(`Login attempt with email: ${email}`);
      
      // For demonstration purposes, we'll simulate a successful login
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: email
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would call an API to register
    try {
      console.log(`Register attempt with name: ${name}, email: ${email}`);
      
      // For demonstration purposes, we'll simulate a successful registration
      const mockUser = {
        id: '1',
        name: name,
        email: email
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
