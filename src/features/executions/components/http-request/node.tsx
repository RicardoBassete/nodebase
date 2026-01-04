'use client'

import { type NodeProps, type Node, useReactFlow } from '@xyflow/react'
import { GlobeIcon } from 'lucide-react'
import { memo, useEffect, useState } from 'react'

import { BaseExecutionNode } from '@/features/executions/components/base-execution-node'
import { NodeStatus } from '@/components/react-flow/node-status-indicator'
import { HttpNodeFormValues, HttpRequestDialog } from './dialog'

type HttpRequestNodeData = {
  endpoint?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: string
}

type HttpRequestNodeType = Node<HttpRequestNodeData>

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const nodeData = props.data
  const description = nodeData?.endpoint
    ? `${nodeData.method || 'GET'}: ${nodeData.endpoint}`
    : 'Not Configured'

  const [dialogOpen, setDialogOpen] = useState(false)
  const { setNodes } = useReactFlow()

  const handleSubmit = (values: HttpNodeFormValues) => {
    setNodes(nodes =>
      nodes.map(node =>
        node.id === props.id
          ? {
              ...node,
              data: {
                ...node.data,
                ...values
              }
            }
          : node
      )
    )
  }

  const handleOpenSettings = () => {
    setDialogOpen(true)
  }

  const nodeStatus: NodeStatus = 'initial'

  return (
    <>
      <HttpRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
        status={nodeStatus}
      />
    </>
  )
})

HttpRequestNode.displayName = 'HttpRequestNode'
