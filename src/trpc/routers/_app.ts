import { inngest } from '@/inngest/client'
import { createTRPCRouter, protectedProcedure } from '../init'
import prisma from '@/lib/database'

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    console.log(ctx.auth.user.id)
    return prisma.workflow.findMany()
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        email: 'ricardogbassete@gmail.com'
      }
    })
    return { success: true, message: 'Job queued' }
  })
})

export type AppRouter = typeof appRouter
