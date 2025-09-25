import { useQuery, useMutation } from '@tanstack/react-query';
import { searchAPI } from '@/services/api';
import { useDebounce } from './useDebounce';
import { useState } from 'react';

export function useSemanticSearch() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<any>({});
  const debouncedQuery = useDebounce(query, 500);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['semantic-search', debouncedQuery, filters],
    queryFn: () => searchAPI.semanticSearch(debouncedQuery, filters),
    enabled: debouncedQuery.length >= 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    query,
    setQuery,
    filters,
    setFilters,
    results: data?.funders || [],
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
  };
}

export function useFunder(id: string) {
  return useQuery({
    queryKey: ['funder', id],
    queryFn: () => searchAPI.getFunder(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Search suggestions hook
export function useSearchSuggestions(query: string) {
  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: ['search-suggestions', debouncedQuery],
    queryFn: async () => {
      // Mock suggestions - replace with actual API call
      const suggestions = [
        'climate change solutions',
        'education technology',
        'healthcare access',
        'renewable energy projects',
        'community development',
      ].filter(s => s.toLowerCase().includes(debouncedQuery.toLowerCase()));
      
      return suggestions;
    },
    enabled: debouncedQuery.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
}