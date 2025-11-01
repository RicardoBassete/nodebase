import { generateText } from 'ai'
import { ollama } from 'ollama-ai-provider-v2'
import { createOpenAI } from '@ai-sdk/openai'
import { createAnthropic } from '@ai-sdk/anthropic'

import { inngest } from './client'

const llama3 = ollama('llama3.2:3b')
const openai = createOpenAI()
const anthropic = createAnthropic()

export const execute = inngest.createFunction(
  { id: 'execute' },
  { event: 'execute/ai' },
  async ({ event, step }) => {
    const { steps: llamaSteps } = await step.ai.wrap(
      'llama-generate-text',
      generateText,
      {
        model: llama3,
        system: 'You are a helpful assistant.',
        prompt: 'Write a vegeterian lasagna recipe for 4 people'
      }
    )

    const { steps: openaiSteps } = await step.ai.wrap(
      'openai-generate-text',
      generateText,
      {
        model: openai('gpt-4'),
        system: 'You are a helpful assistant.',
        prompt: 'Write a vegeterian lasagna recipe for 4 people'
      }
    )

    const { steps: anthropicSteps } = await step.ai.wrap(
      'anthropic-generate-text',
      generateText,
      {
        model: anthropic('claude-sonnet-4-5'),
        system: 'You are a helpful assistant.',
        prompt: 'Write a vegeterian lasagna recipe for 4 people'
      }
    )

    return { llamaSteps, openaiSteps, anthropicSteps }
  }
)
