// API Constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
  },
  SEARCH: {
    SEMANTIC: '/search/semantic',
    SUGGESTIONS: '/search/suggestions',
  },
  FUNDERS: {
    LIST: '/funders',
    DETAIL: (id: string) => `/funders/${id}`,
  },
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects',
    DETAIL: (id: string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
  },
} as const;

// Query Keys
export const QUERY_KEYS = {
  USER: ['user'],
  PROJECTS: ['projects'],
  PROJECT: (id: string) => ['project', id],
  FUNDERS: ['funders'],
  FUNDER: (id: string) => ['funder', id],
  SEMANTIC_SEARCH: (query: string, filters: any) => ['semantic-search', query, filters],
  SEARCH_SUGGESTIONS: (query: string) => ['search-suggestions', query],
} as const;

// Form Validation Constants
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  ORGANIZATION_MIN_LENGTH: 2,
  ORGANIZATION_MAX_LENGTH: 200,
  PROJECT_NAME_MAX_LENGTH: 100,
  PROJECT_DESCRIPTION_MAX_LENGTH: 2000,
  MISSION_MAX_LENGTH: 1000,
  FUNDING_NEEDS_MAX_LENGTH: 1000,
} as const;

// UI Constants
export const UI = {
  TOAST_DURATION: {
    SUCCESS: 5000,
    ERROR: 7000,
    WARNING: 6000,
    INFO: 5000,
  },
  DEBOUNCE_DELAY: {
    SEARCH: 500,
    AUTO_SAVE: 1000,
    SUGGESTIONS: 300,
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
} as const;

// Application Constants
export const APP = {
  NAME: 'Heterotopia',
  DESCRIPTION: 'Connect NGOs with Funders',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@heterotopia.org',
  CONTACT_EMAIL: 'contact@heterotopia.org',
} as const;

// Funding Constants
export const FUNDING = {
  GRANT_SIZE_OPTIONS: [
    { value: '1000', label: '$1,000' },
    { value: '5000', label: '$5,000' },
    { value: '10000', label: '$10,000' },
    { value: '25000', label: '$25,000' },
    { value: '50000', label: '$50,000' },
    { value: '100000', label: '$100,000' },
    { value: '250000', label: '$250,000' },
    { value: '500000', label: '$500,000' },
    { value: '1000000', label: '$1,000,000' },
    { value: 'no_maximum', label: 'No maximum' },
  ],
  SECTORS: [
    'Education',
    'Healthcare',
    'Environment',
    'Human Rights',
    'Community Development',
    'Technology',
    'Arts & Culture',
    'Economic Development',
    'Emergency Relief',
    'Research',
  ],
  GEOGRAPHIC_REGIONS: [
    'North America',
    'South America',
    'Europe',
    'Africa',
    'Asia',
    'Oceania',
    'Global',
  ],
  FUNDER_TYPES: [
    'Foundation',
    'Government',
    'Corporate',
    'Individual',
    'Crowdfunding',
    'International Organization',
  ],
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_FAILED: 'Please check your input and try again.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in!',
  LOGOUT: 'Successfully logged out!',
  REGISTER: 'Account created successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_UPDATED: 'Project updated successfully!',
  PROJECT_DELETED: 'Project deleted successfully!',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  LANGUAGE: 'heterotopia-locale',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  PROJECT_DRAFT: 'project_draft',
} as const;

// Route Constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  SEARCH: '/dashboard/search',
  PROJECTS: '/dashboard/projects',
  PROJECT_NEW: '/dashboard/projects/new',
  PROJECT_DETAIL: (id: string) => `/dashboard/projects/${id}`,
  ONBOARDING: '/onboarding',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;