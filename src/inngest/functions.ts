import prisma from '@/lib/database'
import { inngest } from './client'

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s')
    return step.run('create-workflow', () => {
      return prisma.workflow.create({
        data: {
          name: 'workflow-from-inngest'
        }
      })
    })
  }
)
