'use client'

import React from 'react'
import { EntityContainer, EntityHeader } from '@/components/entity-components'
import { useSuspenseWorkflows } from '../hooks/use-workflows'

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows()

  return (
    <div className="flex-1 flex justify-center items-center">
      <p>{JSON.stringify(workflows.data)}</p>
    </div>
  )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  return (
    <>
      <EntityHeader
        title="Workflows"
        description="Create and manage workflows"
        onNew={() => {}}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={false}
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
