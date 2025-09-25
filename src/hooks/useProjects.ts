import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectAPI } from '@/services/api';
import { useToast } from '@/components/Toast';
import { useRouter } from 'next/navigation';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectAPI.getProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: projectAPI.createProject,
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      addToast('Project created successfully!', 'success');
      router.push(`/dashboard/projects/${newProject.id}`);
    },
    onError: (error: any) => {
      addToast(error.message || 'Failed to create project', 'error');
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      projectAPI.updateProject(id, data),
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.setQueryData(['project', updatedProject.id], updatedProject);
      addToast('Project updated successfully!', 'success');
    },
    onError: (error: any) => {
      addToast(error.message || 'Failed to update project', 'error');
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: projectAPI.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      addToast('Project deleted successfully!', 'success');
    },
    onError: (error: any) => {
      addToast(error.message || 'Failed to delete project', 'error');
    },
  });
}