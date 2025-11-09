import { requireAuth } from '@/lib/auth-utils'

interface Props {
  params: Promise<{
    executionId: string
  }>
}

export default async function Page({ params }: Props) {
  await requireAuth()

  const { executionId } = await params
  return <div>Execution Id: {executionId}</div>
}
