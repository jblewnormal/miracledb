'use client';

import { useState, useEffect, useCallback } from 'react';

import { supabase } from 'src/lib/supabase';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

interface ReturnType {
  error: any | null;
  loading: boolean;
  miracle: Miracle;
  onEditMiracle: (miracle_id: number, title: string, description: string) => Miracle;
  onDeleteMiracle: (miracle_id: number) => boolean;
  //
  onUpdateLikeMiracle: (miracle_id: number, like: boolean) => boolean;
  onCommentMiracle: (miracle_id: number, comment: string) => void;
  onViewMiracle: (miracle_id: number) => boolean;
}

// ----------------------------------------------------------------------

type Props = {
  miracle_id: number;
};

export function useLikes({ miracle_id }: Props): ReturnType {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for async operations
  const [miracleId, setMiracleId] = useState<Miracle['id']>(miracle_id); // State to hold if data

  const { user } = useAuthContext();

  const fetchMiracle = useCallback(async () => {
    const { data, error } = await supabase.from('miracles').select();

    setMiracles(data as Miracle[]);
    setLoading(false);
  }, []);

  /**
   * User functions
   */

  const onUpdateLikeMiracle = useCallback(async (miracle_id: number, like: boolean) => {
    const { data, error } = await supabase.from('likes').insert({ id: 1, name: 'Mordor' }).select();
  }, []);

  const onUpdateLikeMiracleComment = useCallback(async (comment_id: number, like: boolean) => {
    const { data: existingLike, error } = await supabase
      .from('likes')
      .select('*')
      .eq('user_id', user.id)
      .eq('entity_id', comment_id)
      .eq('entity_type', 'comment')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking like:', error.message);
      return;
    }

    if (existingLike) {
      // Unlike if already liked
      const { error: deleteError } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);

      if (deleteError) console.error('Error unliking comment:', deleteError.message);
    } else {
      // Like if not already liked
      const { error: insertError } = await supabase
        .from('likes')
        .insert([{ user_id: userId, entity_id: comment_id, entity_type: 'comment' }]);

      if (insertError) console.error('Error liking comment:', insertError.message);
    }
  }, []);

  const onCreateCommentMiracle = useCallback(async (miracle_id: number, comment: string) => {
    const { data, error } = await supabase
      .from('comments')
      .insert({ id: 1, name: 'Mordor' })
      .select();
  }, []);

  const onDeleteCommentMiracle = useCallback(async (comment_id: number) => {
    const { error } = await supabase.from('comments').delete().eq('id', comment_id);

    if (error) {
      console.error('Error deleting comment:', error.message);
    }
  }, []);

  const onViewMiracle = useCallback(async (miracle_id: number) => {
    const { error } = await supabase.from('analytics_events').insert([
      {
        user_id: userId,
        entity_id: miracle_id,
        entity_type: 'miracle',
        event_type: 'view',
        ip_address: ipAddress,
      },
    ]);

    if (error) {
      console.error('Error tracking view:', error.message);
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
  };
}
