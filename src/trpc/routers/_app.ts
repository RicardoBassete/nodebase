import { inngest } from '@/inngest/client'
import { createTRPCRouter, protectedProcedure } from '../init'

export const appRouter = createTRPCRouter({
  testAI: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'execute/ai'
    })

    return { success: true, message: 'Job queued' }
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    console.log(ctx.auth?.session.id)
    return ctx.prisma.workflow.findMany()
  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.inngest.send({
      name: 'test/hello.world',
      data: {
        email: 'ricardogbassete@gmail.com'
      }
    })
    return { success: true, message: 'Job queued' }
  })
})

export type AppRouter = typeof appRouter
