import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

/**
 * Hook to fetch all workflows using suspense.
 */
export function useSuspenseWorkflows() {
  const trpc = useTRPC()
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions())
}
