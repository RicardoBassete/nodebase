'use client'

import React from 'react'
import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch
} from '@/components/entity-components'
import { useCreateWorkflow, useSuspenseWorkflows } from '../hooks/use-workflows'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import { useRouter } from 'next/navigation'
import { useWorkflowsParams } from '@/hooks/use-workflows-params'
import { useEntitySearch } from '@/hooks/use-entity-search'

export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams()
  const { searchValue, onSearchChange } = useEntitySearch({ params, setParams })

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search Workflows"
    />
  )
}

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows()

  return (
    <div className="flex-1 flex justify-center items-center">
      <ul>
        {workflows.data.items.map(workflow => (
          <li key={workflow.id}>
            ID: {workflow.id} - Name: {workflow.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter()

  const createWorkflow = useCreateWorkflow()
  const { handleError, modal } = useUpgradeModal()

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: handleError,
      onSuccess: data => router.push(`/workflows/${data.id}`)
    })
  }

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage workflows"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  )
}

export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows()
  const [params, setParams] = useWorkflowsParams()

  return (
    <EntityPagination
      disabled={workflows.isFetching}
      page={workflows.data.page}
      totalPages={workflows.data.totalPages}
      onPageChange={page => setParams({ ...params, page })}
    />
  )
}

export const WorkflowsContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  )
}
