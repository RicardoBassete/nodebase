import { NonRetriableError } from 'inngest'
import ky, { type Options as KyOptions } from 'ky'
import Handlebars from 'handlebars'
import type { NodeExecutor } from '@/features/executions/types'
import type { HttpRequestNodeData } from './node'

Handlebars.registerHelper('json', (context) => {
  const jsonString = JSON.stringify(context, null, 2)
  const sageString = new Handlebars.SafeString(jsonString)
  return sageString
})

export const httpRequestExecutor: NodeExecutor<HttpRequestNodeData> = async ({
  nodeId,
  data,
  context,
  step
}) => {
  // TODO: Publish loading state for http request


  if (!data.endpoint) {
    // TODO: Publish error state for http request
    throw new NonRetriableError('HTTP Request Node: Endpoint is required')
  }

  if (!data.variableName) {
    // TODO: Publish error state for http request
    throw new NonRetriableError('HTTP Request Node: Variable name is required')
  }

  if (!data.method) {
    // TODO: Publish error state for http request
    throw new NonRetriableError('HTTP Request Node: Method not configured')
  }

  const result = await step.run('http-request', async () => {
    const endpoint = Handlebars.compile(data.endpoint)(context)
    const method = data.method

    const options: KyOptions = { method }

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const resolved = Handlebars.compile(data.body || '{}')(context)
      try {
        JSON.parse(resolved)
      } catch {
        throw new NonRetriableError('HTTP Request Node: Body is not valid JSON')
      }
      options.body = resolved
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
      [data.variableName]: responsePayload
    }
  })

  // TODO: Publish success state for http request

  return result
}
