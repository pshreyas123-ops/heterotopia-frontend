import { secureStorage, sanitizeInput, rateLimiter } from '@/lib/security';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// API Error Types
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Request interceptor with enhanced security
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = secureStorage.getToken();
  const csrfToken = secureStorage.getCSRFToken();
  
  // Rate limiting check
  const rateLimitKey = `api-${endpoint}`;
  if (!rateLimiter.isAllowed(rateLimitKey, 100, 60000)) {
    throw new APIError('Too many requests. Please try again later.', 429);
  }
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
      'X-Requested-With': 'XMLHttpRequest', // CSRF protection
      ...options.headers,
    },
    credentials: 'same-origin', // Include cookies for same-origin requests
    ...options,
  };

  // Sanitize request body if it exists
  if (options.body && typeof options.body === 'string') {
    try {
      const bodyData = JSON.parse(options.body);
      const sanitizedBody = sanitizeRequestBody(bodyData);
      config.body = JSON.stringify(sanitizedBody);
    } catch {
      // If not JSON, sanitize as string
      config.body = sanitizeInput(options.body);
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Handle 401 - token expired
    if (response.status === 401) {
      secureStorage.removeToken();
      secureStorage.removeCSRFToken();
      // Redirect to login if not already on auth page
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
        window.location.href = '/auth/login';
      }
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData.code
      );
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return {} as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or other errors
    throw new APIError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
}

// Sanitize request body recursively
function sanitizeRequestBody(obj: any): any {
  if (typeof obj === 'string') {
    return sanitizeInput(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeRequestBody);
  }
  
  if (obj && typeof obj === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[sanitizeInput(key)] = sanitizeRequestBody(value);
    }
    return sanitized;
  }
  
  return obj;
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiRequest<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    organization: string;
  }) => {
    return apiRequest<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    return apiRequest<void>('/auth/logout', {
      method: 'POST',
    });
  },

  refreshToken: async () => {
    return apiRequest<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    return apiRequest<any>('/user/profile');
  },

  updateProfile: async (profileData: any) => {
    return apiRequest<any>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Search API
export const searchAPI = {
  semanticSearch: async (query: string, filters?: any) => {
    return apiRequest<{ funders: any[]; total: number }>('/search/semantic', {
      method: 'POST',
      body: JSON.stringify({ query, filters }),
    });
  },

  getFunder: async (id: string) => {
    return apiRequest<any>(`/funders/${id}`);
  },
};

// Project API
export const projectAPI = {
  createProject: async (projectData: any) => {
    return apiRequest<any>('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  getProjects: async () => {
    return apiRequest<any[]>('/projects');
  },

  updateProject: async (id: string, projectData: any) => {
    return apiRequest<any>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  deleteProject: async (id: string) => {
    return apiRequest<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};