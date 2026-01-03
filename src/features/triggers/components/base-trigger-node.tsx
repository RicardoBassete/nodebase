'use client'

import { type NodeProps, Position, useReactFlow } from '@xyflow/react'
import { type LucideIcon } from 'lucide-react'
import { memo, type ReactNode } from 'react'
import Image from 'next/image'

import { BaseNode, BaseNodeContent } from '@/components/react-flow/base-node'
import { BaseHandle } from '@/components/react-flow/base-handle'
import { WorkflowNode } from '@/components/workflow-node'

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string
  name: string
  description?: string
  children?: ReactNode
  onSettings?: () => void
  onDoubleClick?: () => void
}

export const BaseTriggerNode = memo((props: BaseTriggerNodeProps) => {
  const {
    id,
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick
  } = props

  const { setNodes, setEdges } = useReactFlow()

  const handleDelete = () => {
    setNodes(nodes => nodes.filter(node => node.id !== id))
    setEdges(edges =>
      edges.filter(edge => edge.source !== id && edge.target !== id)
    )
  }

  return (
    <WorkflowNode
      name={name}
      description={description}
      onDelete={handleDelete}
      onSettings={onSettings}
    >
      {/* TODO: Wrap in NodeStatusIndicator */}
      <BaseNode
        onDoubleClick={onDoubleClick}
        className="rounded-l-2xl relative group"
      >
        <BaseNodeContent>
          {typeof Icon === 'string' ? (
            <Image src={Icon} alt={name} width={16} height={16} />
          ) : (
            <Icon className="size-4 text-muted-foreground" />
          )}
          {children}
          <BaseHandle id="source-1" type="source" position={Position.Right} />
        </BaseNodeContent>
      </BaseNode>
    </WorkflowNode>
  )
})

BaseTriggerNode.displayName = 'BaseExecutionNode'
