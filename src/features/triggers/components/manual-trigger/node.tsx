'use client'

import type { NodeProps, Node } from '@xyflow/react'
import { GlobeIcon, MousePointerIcon } from 'lucide-react'
import { memo } from 'react'
import { BaseTriggerNode } from '../base-trigger-node'

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <>
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="Manual Trigger"
        // TODO
        // status={nodeStatus }
        // onSettings={handleOpenSettings }
        // onDoubleClick={handleOpenSettings }
      />
    </>
  )
})
