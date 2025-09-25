"use client";

import { ReactNode } from 'react';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'secondary';
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'secondary';
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  illustration?: 'search' | 'data' | 'error' | 'success' | 'custom';
}

const illustrations = {
  search: (
    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  data: (
    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  error: (
    <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action,
  secondaryAction,
  className,
  size = 'md',
  illustration = 'data'
}: EmptyStateProps) {
  const sizeClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  };

  const iconSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  const titleSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  const displayIcon = icon || (illustration !== 'custom' ? illustrations[illustration] : null);

  return (
    <div 
      className={cn(
        'text-center',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-live="polite"
    >
      {displayIcon && (
        <div className={cn(
          'mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4',
          iconSizeClasses[size]
        )}>
          {displayIcon}
        </div>
      )}
      
      <h3 className={cn(
        'font-semibold text-gray-900 mb-2',
        titleSizeClasses[size]
      )}>
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {action && (
            <AccessibleButton
              onClick={action.onClick}
              variant={action.variant || 'default'}
              loading={action.loading}
              aria-label={action.label}
            >
              {action.label}
            </AccessibleButton>
          )}
          
          {secondaryAction && (
            <AccessibleButton
              onClick={secondaryAction.onClick}
              variant={secondaryAction.variant || 'outline'}
              aria-label={secondaryAction.label}
            >
              {secondaryAction.label}
            </AccessibleButton>
          )}
        </div>
      )}
    </div>
  );
}

// Predefined empty states for common scenarios
export const SearchEmptyState = (props: Omit<EmptyStateProps, 'illustration'>) => (
  <EmptyState {...props} illustration="search" />
);

export const DataEmptyState = (props: Omit<EmptyStateProps, 'illustration'>) => (
  <EmptyState {...props} illustration="data" />
);

export const ErrorEmptyState = (props: Omit<EmptyStateProps, 'illustration'>) => (
  <EmptyState {...props} illustration="error" />
);

export const SuccessEmptyState = (props: Omit<EmptyStateProps, 'illustration'>) => (
  <EmptyState {...props} illustration="success" />
);