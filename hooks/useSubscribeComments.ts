import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { supabase } from '../utils/supabase'
import { Comment } from '../types'

export const useSubscribeComments = (postId: string) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const subsc = supabase
      .from(`comments:post_id=eq.${postId}`)
      .on('INSERT', (payload: SupabaseRealtimePayload<Comment>) => {
        let previousComments = queryClient.getQueryData<Comment[]>([
          'comments',
          postId,
        ])

        if (!previousComments) {
          previousComments = []
        }

        queryClient.setQueryData<Comment[]>(
          ['comments', postId],
          [...previousComments, payload.new],
        )
      })
      .on('UPDATE', (payload: SupabaseRealtimePayload<Comment>) => {
        let previousComments = queryClient.getQueryData<Comment[]>([
          'comments',
          postId,
        ])

        if (!previousComments) {
          previousComments = []
        }

        queryClient.setQueryData(
          ['comments', postId],
          previousComments.map((comment) =>
            comment.id === payload.new.id ? payload.new : comment,
          ),
        )
      })
      .on('DELETE', (payload: SupabaseRealtimePayload<Comment>) => {
        let previousComments = queryClient.getQueryData<Comment[]>([
          'comments',
          postId,
        ])

        if (!previousComments) {
          previousComments = []
        }

        queryClient.setQueryData(
          ['comments', postId],
          previousComments.filter((comment) => comment.id !== payload.old.id),
        )
      })
      .subscribe()

    const removeSubscription = async () => {
      await supabase.removeSubscription(subsc)
    }

    return () => {
      removeSubscription()
    }
  }, [queryClient, postId])
}
