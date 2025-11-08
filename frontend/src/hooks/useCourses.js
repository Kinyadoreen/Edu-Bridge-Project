import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.js';

export const useCourses = (filters) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: () => api.getCourses(filters),
  });
};

export const useCourse = (id) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => api.getCourse(id),
    enabled: !!id,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.enrollCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
