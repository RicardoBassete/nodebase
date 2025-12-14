import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import {
  WorkflowsContainer,
  WorkflowsList
} from '@/features/workflows/components/workflows'
import { prefetchWorkflows } from '@/features/workflows/server/prefetch'
import { requireAuth } from '@/lib/auth-utils'
import { HydrateClient } from '@/trpc/server'
import { workflowsParamsLoader } from '@/features/workflows/server/params-loader'
import type { SearchParams } from 'nuqs/server'

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function Page(props: Props) {
  await requireAuth()

  const params = await workflowsParamsLoader(props.searchParams)
  prefetchWorkflows(params)

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary
          fallback={<div>There was an error loading workflows.</div>}
        >
          <Suspense fallback={<div>Loading workflows...</div>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  )
}
