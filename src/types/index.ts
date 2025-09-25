// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ngo' | 'funder' | 'admin';
  organization: string;
  profileComplete: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  mission?: string;
  sectors?: string[];
  geographicFocus?: string[];
  fundingNeeds?: string;
  impactStory?: string;
  website?: string;
  phone?: string;
}

// Funder Types
export interface Funder {
  id: string;
  name: string;
  description: string;
  focusAreas: string[];
  geographicScope: string[];
  fundingRange: {
    min: number;
    max: number;
  };
  applicationDeadlines?: string[];
  website: string;
  contactEmail?: string;
  requirements: string[];
  matchScore?: number;
  matchReasons?: string[];
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  keywords: string[];
  applicantTypes: string[];
  faithBased: boolean;
  location: string;
  grantSizeRange: {
    min: number;
    max: number;
  };
  fundingUse: string[];
  funderTypes: string[];
  createdAt: string;
  updatedAt: string;
}

// Search Types
export interface SearchFilters {
  focusArea?: string;
  location?: string;
  fundingRange?: {
    min?: number;
    max?: number;
  };
  funderTypes?: string[];
}

export interface SearchResult {
  funders: Funder[];
  total: number;
  query: string;
  filters: SearchFilters;
}

// API Response Types
export interface APIResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  organization: string;
}

export interface ProfileForm {
  name: string;
  organization: string;
  mission: string;
  sectors: string[];
  geographicFocus: string[];
  fundingNeeds: string;
  website?: string;
  phone?: string;
}

// Component Props Types
export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  status?: number;
  field?: string;
}

// Toast Types
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Context Types
export interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  isValidLocale: (locale: string) => boolean;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type'], duration?: number) => void;
  removeToast: (id: string) => void;
}