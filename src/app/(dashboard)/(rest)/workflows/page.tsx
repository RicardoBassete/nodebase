import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import {
  WorkflowsContainer,
  WorkflowsList
} from '@/features/workflows/components/workflows'
import { prefetchWorkflows } from '@/features/workflows/server/prefetch'
import { requireAuth } from '@/lib/auth-utils'
import { HydrateClient } from '@/trpc/server'

export default async function Page() {
  await requireAuth()

  prefetchWorkflows()

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
