import type { inferInput } from '@trpc/tanstack-react-query'
import { prefetch, trpc } from '@/trpc/server'

type Input = inferInput<typeof trpc.workflows.getMany>

/**
 * Prefetch all workflows
 */
export const prefetchWorkflows = async (params: Input) => {
  void prefetch(trpc.workflows.getMany.queryOptions(params))
}

/**
 * Prefetch a single workflow
 */
export const prefetchWorkflow = async (id: string) => {
  void prefetch(trpc.workflows.getOne.queryOptions({ id }))
}
