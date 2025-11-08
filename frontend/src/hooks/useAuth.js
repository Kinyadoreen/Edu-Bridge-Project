import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuthStore } from '../store/authStore.js';

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: ({ email, password }) => api.login(email, password),
    onSuccess: (data) => {
      login(data.user, data.token);
      navigate('/dashboard');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: api.register,
    onSuccess: (data) => {
      login(data.user, data.token);
      navigate('/dashboard');
    },
  });
};

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: api.getDashboard,
  });
};
