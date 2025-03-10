'use client';

import type { Database } from 'database.types';

import { useState, useEffect, useCallback } from 'react';

import { supabase } from 'src/lib/supabase';

// ----------------------------------------------------------------------

interface ReturnType {
  error: any | null;
  loading: boolean;
  miracles: Miracle[];
  onSearchMiracles: (query: string) => Miracle[];
  fetchMiraclesByPage: (page: number) => Miracle[];
  onCreateMiracle: (title: string, content: string, category: any) => Miracle;
}

// ----------------------------------------------------------------------

export type Miracle = Database['public']['Tables']['miracles']['Row'];

export function useMiracles(): ReturnType {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for async operations
  const [miracles, setMiracles] = useState<Miracle[]>(); // State to hold if data

  const fetchMiracles = useCallback(async () => {
    const { data, error } = await supabase.from('miracles').select();

    setMiracles(data as Miracle[]);
    setLoading(false);
  }, []);

  const onSearchMiracles = useCallback(async (query: string) => {
    // const { data, error } = await supabase.from('miracles').select();

    // setMiracles(data as Miracle[]);
    setLoading(false);
  }, []);

  const onCreateMiracle = useCallback(async (title: string, content: string, category: any) => {
    const { data, error } = await supabase
      .from('miracles')
      .insert({ title, content, category, created_at: new Date() })
      .select();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking like:', error.message);
      return;
    }

    return data;
  }, []);

  // On component mount, fetch miracles
  useEffect(() => {
    fetchMiracles();
  }, [fetchMiracles]);

  return {
    error,
    loading,
    miracles,
    onSearchMiracles,
    fetchMiraclesByPage,
    onCreateMiracle,
  };
}
