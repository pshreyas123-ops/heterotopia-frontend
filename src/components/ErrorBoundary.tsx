"use client";

import React from 'react';
import { generateId } from '@/lib/security';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorId?: string;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void; errorId?: string }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo, errorId: string) => void;
  level?: 'page' | 'component' | 'feature';
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryCount = 0;
  private maxRetries = 3;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const errorId = generateId();
    return { 
      hasError: true, 
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorId = this.state.errorId || generateId();
    
    // Enhanced error logging
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      level: this.props.level || 'component',
      retryCount: this.retryCount,
    };

    console.error('Error caught by boundary:', errorData);
    
    // Call custom error handler
    this.props.onError?.(error, errorInfo, errorId);
    
    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      this.reportError(errorData);
    }

    this.setState({ errorInfo });
  }

  private reportError = async (errorData: any) => {
    try {
      // Send to error reporting service (e.g., Sentry, LogRocket, etc.)
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData),
      // });
      console.log('Error reported:', errorData);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  resetError = () => {
    this.retryCount++;
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorId: undefined,
      errorInfo: undefined 
    });
  };

  render() {
    if (this.state.hasError) {
      // If we've exceeded max retries, show a more permanent error state
      if (this.retryCount >= this.maxRetries) {
        return this.renderPermanentError();
      }

      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent 
            error={this.state.error!} 
            resetError={this.resetError}
            errorId={this.state.errorId}
          />
        );
      }

      return this.renderDefaultError();
    }

    return this.props.children;
  }

  private renderDefaultError() {
    const { level = 'component' } = this.props;
    
    // Different UI based on error level
    if (level === 'component') {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-sm font-medium text-red-800">Component Error</h3>
          </div>
          <p className="mt-1 text-sm text-red-700">
            This component encountered an error. Please try again.
          </p>
          <button
            onClick={this.resetError}
            className="mt-2 text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Retry
          </button>
        </div>
      );
    }

    // Page-level error
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Oops! Something went wrong
          </h1>
          
          <p className="text-gray-600 text-center mb-6">
            We're sorry for the inconvenience. Our team has been notified and is working on a fix.
          </p>

          {this.state.errorId && (
            <div className="mb-4 p-3 bg-gray-100 border rounded text-center">
              <p className="text-sm text-gray-600">
                <strong>Error ID:</strong> {this.state.errorId}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Please include this ID when contacting support
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={this.resetError}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Refresh Page
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Go Home
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-6 p-3 bg-gray-100 rounded text-xs">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                🔧 Development Error Details
              </summary>
              <div className="space-y-2">
                <div>
                  <strong>Error:</strong> {this.state.error.message}
                </div>
                {this.state.error.stack && (
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="mt-1 whitespace-pre-wrap text-xs bg-gray-200 p-2 rounded overflow-auto max-h-40">
                      {this.state.error.stack}
                    </pre>
                  </div>
                )}
                {this.state.errorInfo?.componentStack && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="mt-1 whitespace-pre-wrap text-xs bg-gray-200 p-2 rounded overflow-auto max-h-40">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    );
  }

  private renderPermanentError() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Persistent Error
          </h1>
          
          <p className="text-gray-600 mb-6">
            This error has occurred multiple times. Please refresh the page or contact support.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Refresh Page
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;