import { requireAuth } from '@/lib/auth-utils'

interface Props {
  params: {
    workflowId: string
  }
}

export default async function Page({ params }: Props) {
  await requireAuth()

  return <div>Workflow ID: {params.workflowId}</div>
}
