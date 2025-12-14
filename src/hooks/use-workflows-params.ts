import { useQueryStates } from 'nuqs'
import { workFlowsParams } from '@/features/workflows/params'

export function useWorkflowsParams() {
  return useQueryStates(workFlowsParams)
}
