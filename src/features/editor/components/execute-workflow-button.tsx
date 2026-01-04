'use client'

import { Button } from '@/components/ui/button'
import { useExecuteWorkflow } from '@/features/workflows/hooks/use-workflows'
import { FlaskConicalIcon } from 'lucide-react'

interface Props {
  workflowId: string
}

export const ExecuteWorkflowButton = ({ workflowId }: Props) => {
  const executeWorkflow = useExecuteWorkflow()

  return (
    <Button
      size="lg"
      onClick={() => executeWorkflow.mutate({ id: workflowId })}
      disabled={executeWorkflow.isPending}
    >
      <FlaskConicalIcon className="size-4" />
      Execute Workflow
    </Button>
  )
}
