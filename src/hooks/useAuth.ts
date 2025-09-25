import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI, userAPI } from '@/services/api';
import { secureStorage } from '@/lib/security';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addToast } = useToast();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authAPI.login(email, password),
    onSuccess: (data) => {
      secureStorage.setToken(data.token);
      queryClient.setQueryData(['user'], data.user);
      addToast('Successfully logged in!', 'success');
      router.push('/dashboard');
    },
    onError: (error: any) => {
      addToast(error.message || 'Login failed', 'error');
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: {
      name: string;
      email: string;
      password: string;
      organization: string;
    }) => authAPI.register(userData),
    onSuccess: (data) => {
      secureStorage.setToken(data.token);
      queryClient.setQueryData(['user'], data.user);
      addToast('Account created successfully!', 'success');
      router.push('/onboarding');
    },
    onError: (error: any) => {
      addToast(error.message || 'Registration failed', 'error');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      secureStorage.removeToken();
      queryClient.clear();
      addToast('Successfully logged out', 'success');
      router.push('/');
    },
    onError: (error: any) => {
      // Still clear local data even if API call fails
      secureStorage.removeToken();
      queryClient.clear();
      router.push('/');
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}

export function useUser() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: userAPI.getProfile,
    enabled: !!secureStorage.getToken(),
    retry: (failureCount, error: any) => {
      // Don't retry on 401 (unauthorized)
      if (error?.status === 401) {
        secureStorage.removeToken();
        return false;
      }
      return failureCount < 3;
    },
  });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user'], updatedUser);
      addToast('Profile updated successfully!', 'success');
    },
    onError: (error: any) => {
      addToast(error.message || 'Failed to update profile', 'error');
    },
  });
}