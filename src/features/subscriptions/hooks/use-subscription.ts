import { useQuery, queryOptions } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'

export const subscriptionQueryOptions = queryOptions({
  queryKey: ['subscription'],
  queryFn: async () => {
    const { data } = await authClient.customer.state()
    return data
  }
})

export function useSubscription() {
  return useQuery(subscriptionQueryOptions)
}

export function useHasActiveSubscription() {
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
