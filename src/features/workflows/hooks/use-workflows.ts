import { useWorkflowsParams } from '@/hooks/use-workflows-params'
import { useTRPC } from '@/trpc/client'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from '@tanstack/react-query'
import { toast } from 'sonner'

/**
 * Hook to fetch all workflows using suspense.
 */
export function useSuspenseWorkflows() {
  const trpc = useTRPC()
  const [params] = useWorkflowsParams()

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params))
}

/**
 * Hook to create a new workflow.
 */
export function useCreateWorkflow() {
  const queryClient = useQueryClient()
  const trpc = useTRPC()

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: data => {
        toast.success(`Workflow ${data.name} created`)
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
      },
      onError: error => {
        toast.error(`Error creating workflow: ${error.message}`)
      }
    })
  )
}

/**
 * Hook to remove a workflow.
 */
export function useRemoveWorkflow() {
  const queryClient = useQueryClient()
  const trpc = useTRPC()

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: data => {
        toast.success(`Workflow"${data.name}" removed`)
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
      },
      onError: error => {
        toast.error(`Error removing workflow: ${error.message}`)
      }
    })
  )
}
