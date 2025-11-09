import { useQuery } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'

export function useSubscription() {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data } = await authClient.customer.state()
      return data
    }
  })
}

export function userHasActiveSubscription() {
  const { data, isLoading, ...rest } = useSubscription()

  const hasActiveSubscription =
    data?.activeSubscriptions && data?.activeSubscriptions.length > 0

  return {
    hasActiveSubscription,
    subscription: data?.activeSubscriptions[0],
    isLoading,
    ...rest
  }
}
