// API configuration and utilities for the Heterotopia frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Authentication API
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  
  register: (userData: { 
    email: string; 
    password: string; 
    organizationName: string; 
    userType: string;
  }) =>
    apiClient.post('/auth/register', userData),
  
  logout: () =>
    apiClient.post('/auth/logout'),
  
  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    apiClient.post('/auth/reset-password', { token, password }),
  
  verifyEmail: (token: string) =>
    apiClient.post('/auth/verify-email', { token }),
};

// Profile API
export const profileApi = {
  getNGOProfile: (id: string) =>
    apiClient.get(`/profiles/ngo/${id}`),
  
  updateNGOProfile: (id: string, data: any) =>
    apiClient.put(`/profiles/ngo/${id}`, data),
  
  getFunderProfile: (id: string) =>
    apiClient.get(`/profiles/funder/${id}`),
  
  updateFunderProfile: (id: string, data: any) =>
    apiClient.put(`/profiles/funder/${id}`, data),
};

// Search API
export const searchApi = {
  semanticSearch: (query: string, filters?: any) =>
    apiClient.post('/search/semantic', { query, filters }),
  
  getRecommendations: (userId: string) =>
    apiClient.get(`/search/recommendations/${userId}`),
  
  submitFeedback: (matchId: string, feedback: boolean) =>
    apiClient.post('/search/feedback', { matchId, feedback }),
};

// Admin API
export const adminApi = {
  getPendingUsers: () =>
    apiClient.get('/admin/pending-users'),
  
  approveUser: (userId: string) =>
    apiClient.post(`/admin/approve-user/${userId}`),
  
  rejectUser: (userId: string, reason?: string) =>
    apiClient.post(`/admin/reject-user/${userId}`, { reason }),
  
  getStats: () =>
    apiClient.get('/admin/stats'),
};

// Utility functions for handling API responses
export const handleApiError = (error: any): string => {
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
};

export const isApiError = (error: any): error is ApiError => {
  return error && typeof error.message === 'string';
};

// Mock data flag - set to true during development
export const USE_MOCK_DATA = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL;

// Mock API responses for development
export const mockResponses = {
  login: { success: true, data: { token: 'mock-token', user: { id: '1', name: 'Test User' } } },
  register: { success: true, data: { message: 'Registration successful' } },
  search: { success: true, data: { results: [], total: 0 } },
};