'use client'

import type { NodeProps, Node } from '@xyflow/react'
import { GlobeIcon, MousePointerIcon } from 'lucide-react'
import { memo, useState } from 'react'
import { BaseTriggerNode } from '../base-trigger-node'
import { ManualTriggerDialog } from './dialog'

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpenSettings = () => {
    setDialogOpen(true)
  }

  return (
    <>
      <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="Manual Trigger"
        // TODO
        // status={nodeStatus }
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
})
