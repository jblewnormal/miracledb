'use client';

import { useState, useCallback } from 'react';

import { supabase } from 'src/lib/supabase';

// ----------------------------------------------------------------------

interface ReturnType {
  error: any | null;
  loading: boolean;
  onView: (content_id: number, content_type: string, ts: number) => boolean;
}

// ----------------------------------------------------------------------

export function useAnalytics(): ReturnType {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for async operations

  const onView = useCallback(async (content_id: number, content_type: string, ts: number) => {
    const { data, error } = await supabase
      .from('miracles')
      .insert({ title, content, category, created_at: ts })
      .select();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking like:', error.message);
      return;
    }

    return data;
  }, []);

  return {
    error,
    loading,
    onView,
  };
}
