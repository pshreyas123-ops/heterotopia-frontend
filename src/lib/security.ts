// Security utilities for token management and data protection

const TOKEN_KEY = 'heterotopia_auth_token';
const CSRF_TOKEN_KEY = 'heterotopia_csrf_token';

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const secureStorage = {
  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      // Use sessionStorage for better security
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_KEY); // Clean up old localStorage tokens
    }
  },

  hasToken: (): boolean => {
    return !!secureStorage.getToken();
  },

  // CSRF token management
  setCSRFToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(CSRF_TOKEN_KEY, token);
    }
  },

  getCSRFToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(CSRF_TOKEN_KEY);
    }
    return null;
  },

  removeCSRFToken: (): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(CSRF_TOKEN_KEY);
    }
  },
};

// Utility to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return secureStorage.hasToken();
};

// Enhanced input sanitization to prevent XSS
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/&lt;script&gt;/gi, '') // Remove encoded script tags
    .replace(/&lt;\/script&gt;/gi, '')
    .trim();
};

// Sanitize HTML content
export const sanitizeHTML = (html: string): string => {
  if (typeof html !== 'string') return '';
  
  // Basic HTML sanitization - in production, use a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

// Validate email format with enhanced security
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Validate URL format
export const isValidURL = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Generate a cryptographically secure random ID
export const generateId = (): string => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  // Fallback for environments without crypto API
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Rate limiting utility
export const rateLimiter = {
  isAllowed: (key: string, maxRequests: number, windowMs: number): boolean => {
    const now = Date.now();
    const record = rateLimitStore.get(key);
    
    if (!record || now > record.resetTime) {
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (record.count >= maxRequests) {
      return false;
    }
    
    record.count++;
    return true;
  },
  
  reset: (key: string): void => {
    rateLimitStore.delete(key);
  }
};

// Content Security Policy helpers
export const CSP_NONCE = generateId();

// Safe link handling
export const createSafeLink = (href: string, text: string): { href: string; text: string; isExternal: boolean } => {
  const sanitizedHref = sanitizeInput(href);
  const sanitizedText = sanitizeInput(text);
  const isExternal = isValidURL(sanitizedHref) && !sanitizedHref.startsWith(window.location.origin);
  
  return {
    href: sanitizedHref,
    text: sanitizedText,
    isExternal
  };
};

// Password strength validation
export const validatePasswordStrength = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};