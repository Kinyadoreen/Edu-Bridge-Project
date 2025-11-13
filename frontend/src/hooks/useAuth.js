const { useMutation, useQueryClient } = require('@tanstack/react-query');
const { useNavigate } = require('react-router-dom');
const api = require('../utils/api.js');

// ---------------------------
// Login
// ---------------------------
const useLogin = () => {
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
      if (data.user.role === 'teacher' || data.user.role === 'instructor') {
        navigate('/instructor/dashboard');
      } else {
        navigate('/dashboard');
      }
    },
  });
};

// ---------------------------
// Register
// ---------------------------
const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.invalidateQueries();
      navigate('/dashboard');
    },
  });
};

// ---------------------------
// Logout
// ---------------------------
const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    queryClient.clear();
    navigate('/');
  };
};

// ---------------------------
// Current User
// ---------------------------
const useCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// ---------------------------
// Check if authenticated
// ---------------------------
const useIsAuthenticated = () => {
  return !!localStorage.getItem('token');
};

module.exports = {
  useLogin,
  useRegister,
  useLogout,
  useCurrentUser,
  useIsAuthenticated,
};
