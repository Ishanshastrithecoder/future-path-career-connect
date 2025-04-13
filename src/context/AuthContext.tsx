
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  googleSignIn: () => Promise<void>;
  appleSignIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const mockUsers = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    occupation: 'Software Engineer',
    education: [],
    experience: [],
    skills: ['JavaScript', 'React', 'Node.js'],
    interests: ['Web Development', 'AI', 'Machine Learning'],
    connections: []
  },
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - In a real app, this would be an API call
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock registration - In a real app, this would be an API call
      const newUser = {
        id: `${mockUsers.length + 1}`,
        username,
        email,
        firstName: '',
        lastName: '',
        profilePicture: 'https://randomuser.me/api/portraits/lego/1.jpg', // Default profile picture
        occupation: '',
        education: [], // Initialize as empty array
        experience: [], // Initialize as empty array
        skills: [],
        interests: [],
        connections: []
      };
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === email || u.username === username)) {
        throw new Error('User already exists');
      }
      
      mockUsers.push(newUser);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      // Mock Google sign-in - In a real app, this would use OAuth
      const googleUser = {
        id: 'g1',
        username: 'googleuser',
        email: 'google@example.com',
        firstName: 'Google',
        lastName: 'User',
        profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg',
        occupation: 'Professional',
        education: [],
        experience: [],
        skills: [],
        interests: [],
        connections: []
      };
      
      setUser(googleUser);
      localStorage.setItem('user', JSON.stringify(googleUser));
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const appleSignIn = async () => {
    setIsLoading(true);
    try {
      // Mock Apple sign-in - In a real app, this would use OAuth
      const appleUser = {
        id: 'a1',
        username: 'appleuser',
        email: 'apple@example.com',
        firstName: 'Apple',
        lastName: 'User',
        profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
        occupation: 'Professional',
        education: [],
        experience: [],
        skills: [],
        interests: [],
        connections: []
      };
      
      setUser(appleUser);
      localStorage.setItem('user', JSON.stringify(appleUser));
    } catch (error) {
      console.error('Apple sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    googleSignIn,
    appleSignIn
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
