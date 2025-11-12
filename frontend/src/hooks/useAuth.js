import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.js';

// Login mutation
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      // Save token and user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Invalidate all queries to refetch with new auth
      queryClient.invalidateQueries();
      
      // Navigate based on role
      if (data.user.role === 'instructor') {
        navigate('/instructor/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  });
};

// Register mutation
export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    onSuccess: (data) => {
      // Save token and user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Invalidate all queries
      queryClient.invalidateQueries();
      
      // Navigate to dashboard
      navigate('/dashboard');
    }
  });
};

// Logout
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return () => {
    // Clear storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear all cached queries
    queryClient.clear();
    
    // Navigate to home
    navigate('/');
  };
};

// Get current user from localStorage
export const useCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const useIsAuthenticated = () => {
  return !!localStorage.getItem('token');
};