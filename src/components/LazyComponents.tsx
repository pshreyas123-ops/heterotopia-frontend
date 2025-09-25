"use client";

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-states';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load heavy components with proper error boundaries and loading states
const ProjectSetupWizardComponent = lazy(() => 
  import('@/components/project-setup/ProjectSetupWizard').then(module => ({
    default: module.ProjectSetupWizard
  }))
);

const SearchPageComponent = lazy(() => 
  import('@/app/dashboard/search/page').then(module => ({
    default: module.default
  }))
);

const ProfilePageComponent = lazy(() => 
  import('@/app/dashboard/profile/page').then(module => ({
    default: module.default
  }))
);

// Higher-order component for lazy loading with error boundary and suspense
function withLazyLoading<T extends object>(
  Component: React.LazyExoticComponent<React.ComponentType<T>>,
  fallback?: React.ReactNode,
  errorFallback?: React.ComponentType<{ error: Error; resetError: () => void }>
) {
  return function LazyWrapper(props: T) {
    return (
      <ErrorBoundary fallback={errorFallback} level="component">
        <Suspense fallback={fallback || <LoadingSpinner size="lg" />}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

// Export wrapped components
export const ProjectSetupWizard = withLazyLoading(
  ProjectSetupWizardComponent,
  <div className="p-6">
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export const SearchPage = withLazyLoading(
  SearchPageComponent,
  <div className="space-y-4">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

export const ProfilePage = withLazyLoading(
  ProfilePageComponent,
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

// Preload components for better UX
export const preloadComponents = {
  projectSetup: () => import('@/components/project-setup/ProjectSetupWizard'),
  searchPage: () => import('@/app/dashboard/search/page'),
  profilePage: () => import('@/app/dashboard/profile/page'),
};

// Utility to preload components based on route
export const preloadForRoute = (route: string) => {
  switch (route) {
    case '/dashboard':
      preloadComponents.searchPage();
      break;
    case '/dashboard/profile':
      preloadComponents.profilePage();
      break;
    case '/dashboard/projects':
      preloadComponents.projectSetup();
      break;
    case '/dashboard/search':
      preloadComponents.searchPage();
      break;
    default:
      break;
  }
};