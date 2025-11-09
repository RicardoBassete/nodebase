'use client'

import React from 'react'
import { EntityContainer, EntityHeader } from '@/components/entity-components'
import { useCreateWorkflow, useSuspenseWorkflows } from '../hooks/use-workflows'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows()

  return (
    <div className="flex-1 flex justify-center items-center">
      <ul>
        {workflows.data.map(workflow => (
          <li key={workflow.id}>
            ID: {workflow.id} - Name: {workflow.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow()

  const { handleError, modal } = useUpgradeModal()

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: handleError
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

export const WorkflowsContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  )
}
