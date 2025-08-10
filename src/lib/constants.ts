// Application constants and configuration

// Application metadata
export const APP_NAME = 'Heterotopia';
export const APP_DESCRIPTION = 'Connect NGOs with Funders for Greater Impact';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_ENDPOINTS = {
  AUTH: '/auth',
  PROFILES: '/profiles',
  SEARCH: '/search',
  ADMIN: '/admin',
  ANALYTICS: '/analytics',
} as const;

// User roles
export const USER_ROLES = {
  NGO: 'ngo',
  FUNDER: 'funder',
  CONSULTANT: 'consultant',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Organization types
export const ORGANIZATION_TYPES = [
  'Local NGO',
  'International NGO',
  'Community Organization',
  'Social Enterprise',
  'Foundation',
  'Charity',
  'Government Agency',
  'Academic Institution',
] as const;

// Sectors/Focus areas
export const SECTORS = [
  'Health',
  'Education',
  'Environment',
  'Human Rights',
  'Economic Development',
  'Agriculture',
  'Water & Sanitation',
  'Gender Equality',
  'Technology',
  'Climate',
  'Disaster Relief',
  'Food Security',
  'Microfinance',
  'Arts & Culture',
  'Sports & Recreation',
] as const;

// Geographic regions
export const REGIONS = [
  'North America',
  'South America',
  'Europe',
  'Sub-Saharan Africa',
  'Middle East & North Africa',
  'South Asia',
  'Southeast Asia',
  'East Asia',
  'Oceania',
  'Global',
] as const;

// SDG Goals
export const SDG_GOALS = [
  'No Poverty',
  'Zero Hunger',
  'Good Health and Well-being',
  'Quality Education',
  'Gender Equality',
  'Clean Water and Sanitation',
  'Affordable and Clean Energy',
  'Decent Work and Economic Growth',
  'Industry, Innovation and Infrastructure',
  'Reduced Inequalities',
  'Sustainable Cities and Communities',
  'Responsible Consumption and Production',
  'Climate Action',
  'Life Below Water',
  'Life on Land',
  'Peace, Justice and Strong Institutions',
  'Partnerships for the Goals',
] as const;

// Funding ranges
export const FUNDING_RANGES = [
  'Under $10K',
  '$10K - $25K',
  '$25K - $50K',
  '$50K - $100K',
  '$100K - $250K',
  '$250K - $500K',
  '$500K - $1M',
  'Over $1M',
] as const;

// Team sizes
export const TEAM_SIZES = [
  '1-5 people',
  '6-15 people',
  '16-25 people',
  '25-50 people',
  '50+ people',
] as const;

// Application statuses
export const APPLICATION_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  UNDER_REVIEW: 'under_review',
} as const;

// Search filters
export const SEARCH_FILTERS = {
  FOCUS_AREA: 'focusArea',
  LOCATION: 'location',
  FUNDING_RANGE: 'fundingRange',
  ORGANIZATION_TYPE: 'organizationType',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'],
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'heterotopia_auth_token',
  USER_DATA: 'heterotopia_user',
  LANGUAGE: 'heterotopia-locale',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  ONBOARDING_SKIPPED: 'onboarding_skipped',
  NGO_PROFILE: 'ngo_profile',
  SEARCH_HISTORY: 'search_history',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. Please contact support if you believe this is an error.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully!',
  EMAIL_SENT: 'Email sent successfully!',
  REGISTRATION_SUCCESS: 'Registration successful! Please check your email to verify your account.',
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  PASSWORD_RESET: 'Password reset successfully!',
} as const;

// Validation rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  ORGANIZATION_NAME_MIN_LENGTH: 2,
  ORGANIZATION_NAME_MAX_LENGTH: 100,
  MISSION_MIN_LENGTH: 50,
  MISSION_MAX_LENGTH: 1000,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;

// Feature flags
export const FEATURES = {
  SEMANTIC_SEARCH: true,
  ADMIN_DASHBOARD: true,
  MULTI_LANGUAGE: true,
  EMAIL_NOTIFICATIONS: false, // Disabled in MVP
  REAL_TIME_CHAT: false, // Future feature
  ADVANCED_ANALYTICS: false, // Future feature
} as const;

// External links
export const EXTERNAL_LINKS = {
  PRIVACY_POLICY: '/privacy',
  TERMS_OF_SERVICE: '/terms',
  CONTACT: '/contact',
  ABOUT: '/about',
  HELP: '/help',
  GITHUB: 'https://github.com/heterotopia',
  TWITTER: 'https://twitter.com/heterotopia',
  LINKEDIN: 'https://linkedin.com/company/heterotopia',
} as const;

// Theme configuration
export const THEME = {
  COLORS: {
    PRIMARY: '#3b82f6', // blue-500
    SECONDARY: '#6b7280', // gray-500
    SUCCESS: '#10b981', // emerald-500
    WARNING: '#f59e0b', // amber-500
    ERROR: '#ef4444', // red-500
    INFO: '#06b6d4', // cyan-500
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px',
  },
} as const;