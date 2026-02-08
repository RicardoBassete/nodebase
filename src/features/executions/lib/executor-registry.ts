import { NodeType } from '@/generated/prisma/client'
import { NodeExecutor } from '../types'
import { manualTriggerExecutor } from '@/features/triggers/components/manual-trigger/executor'
import { httpRequestExecutor } from '../components/http-request/executor'

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: (() => Promise.resolve({})) as NodeExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor as NodeExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor as NodeExecutor
}

export const getExecutor = (nodeType: NodeType): NodeExecutor => {
  const executor = executorRegistry[nodeType] as NodeExecutor
  if (!executor) {
    throw new Error(`Executor for node type ${nodeType} not found`)
  }
  return executor
}
