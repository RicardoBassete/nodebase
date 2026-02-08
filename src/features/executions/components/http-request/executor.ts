import { HttpRequestNodeData } from './node'
import { NonRetriableError } from 'inngest'
import ky, { type Options as KyOptions } from 'ky'
import type { NodeExecutor } from '@/features/executions/types'

export const httpRequestExecutor: NodeExecutor<HttpRequestNodeData> = async ({
  nodeId,
  data,
  context,
  step
}) => {
  // TODO: Publish loading state for http request

  const { endpoint, variableName, method } = data

  if (!endpoint) {
    // TODO: Publish error state for http request
    throw new NonRetriableError('HTTP Request Node: Endpoint is required')
  }

  if (!variableName) {
    // TODO: Publish error state for http request
    throw new NonRetriableError('HTTP Request Node: Variable name is required')
  }

  if (!method) {
    // TODO: Publish error state for http request
    throw new NonRetriableError('HTTP Request Node: Method not configured')
  }

  const result = await step.run('http-request', async () => {
    const options: KyOptions = { method }

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      options.body = data.body
      options.headers = {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }

    const response = await ky(endpoint, options)
    const contentType = response.headers.get('content-type')
    const responseData = contentType?.includes('application/json')
      ? await response.json()
      : await response.text()

    const responsePayload = {
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      }
    }

    return {
      ...context,
      [variableName]: responsePayload
    }
  })

  // TODO: Publish success state for http request

  return result
}
