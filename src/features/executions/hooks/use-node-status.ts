import type { Realtime } from '@inngest/realtime'
import { useInngestSubscription } from '@inngest/realtime/hooks'
import { useEffect, useState } from 'react'
import type { NodeStatus } from '@/components/react-flow/node-status-indicator'

interface UseNodeStatusOptions {
  nodeId: string
  channel: string
  topic: string
  refreshToken: () => Promise<Realtime.Subscribe.Token>
}

export function useNodeStatus({
  nodeId,
  channel,
  topic,
  refreshToken
}: UseNodeStatusOptions) {
  const [status, setStatus] = useState<NodeStatus>('initial')

  const { data } = useInngestSubscription({
    refreshToken,
    enabled: true
  })

  useEffect(() => {
    if (!data.length) return

    // Messages are appended in receive order; take the latest match for this node.
    for (let i = data.length - 1; i >= 0; i--) {
      const msg = data[i]
      if (
        msg.kind === 'data' &&
        msg.channel === channel &&
        msg.topic === topic &&
        msg.data.nodeId === nodeId
      ) {
        setStatus(msg.data.status as NodeStatus)
        return
      }
    }
  }, [data, nodeId, channel, topic])

  return status
}
