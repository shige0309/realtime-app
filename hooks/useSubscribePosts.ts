import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'
import { Post } from '../types'

export const useSubscribePosts = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const subsc = supabase
      .from('posts')
      .on('INSERT', (payload: SupabaseRealtimePayload<Post>) => {
        let previousPosts = queryClient.getQueryData<Post[]>(['posts'])

        if (!previousPosts) {
          previousPosts = []
        }

        queryClient.setQueryData<Post[]>(
          ['posts'],
          [...previousPosts, payload.new],
        )
      })
      .on('UPDATE', (payload: SupabaseRealtimePayload<Post>) => {
        let previousPosts = queryClient.getQueryData<Post[]>(['posts'])

        if (!previousPosts) {
          previousPosts = []
        }

        queryClient.setQueryData<Post[]>(
          ['posts'],
          previousPosts.map((post) =>
            post.id === payload.new.id ? payload.new : post,
          ),
        )
      })
      .on('DELETE', (payload: SupabaseRealtimePayload<Post>) => {
        let previousPosts = queryClient.getQueryData<Post[]>(['posts'])

        if (!previousPosts) {
          previousPosts = []
        }

        queryClient.setQueryData<Post[]>(
          ['posts'],
          previousPosts.filter((post) => post.id !== payload.old.id),
        )
      })
      .subscribe()

    const removeSubscription = async () => {
      await supabase.removeSubscription(subsc)
    }

    return () => {
      removeSubscription()
    }
  }, [queryClient])
}
