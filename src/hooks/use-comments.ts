'use client';

import type { Comment } from 'src/types/db';

import { useState, useEffect, useCallback } from 'react';

import { supabase } from 'src/lib/supabase';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

interface ReturnType {
  error: any | null;
  loading: boolean;
  miracle: Miracle;
  comments: Comment[];
  //
  onCreateComment: (miracle_id: number, comment: string) => void;
  onDeleteComment: (miracle_id: number) => boolean;
}

// ----------------------------------------------------------------------

type Props = {
  miracle_id: number;
};

export function useComments({ miracle_id }: Props): ReturnType {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for async operations
  const [miracleId, setMiracleId] = useState<Miracle['id']>(miracle_id); // State to hold if data

  const { user } = useAuthContext();

  const fetchMiracle = useCallback(async () => {
    const { data, error } = await supabase.from('miracles').select();

    setMiracles(data as Miracle[]);
    setLoading(false);
  }, []);

  const onCreateComment = useCallback(async (miracle_id: number, comment: string) => {
    const { data, error } = await supabase
      .from('comments')
      .insert({ id: 1, name: 'Mordor' })
      .select();
  }, []);

  const onDeleteComment = useCallback(async (id: number) => {
    const { error } = await supabase.from('comments').delete().eq('id', id);

    if (error) {
      console.error('Error deleting comment:', error.message);
    }
  }, []);

  // On component mount, fetch miracles
  useEffect(() => {
    fetchMiracle();
  }, [fetchMiracle]);

  return {
    error,
    loading,
    miracle,
    comments,
    onCreateComment,
    onDeleteComment,
  };
}
