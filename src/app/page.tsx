'use client'

import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function Home() {
  const queryClient = useQueryClient()
  const trpc = useTRPC()
  const { data } = useQuery(trpc.getWorkflows.queryOptions())

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success('Job queued')
      }
    })
  )

  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}
