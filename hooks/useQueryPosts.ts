import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { Post } from '../types/'

export const useQueryPosts = () => {
  const getPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) {
      throw error
    }
    return data
  }
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: Infinity,
  })
}
