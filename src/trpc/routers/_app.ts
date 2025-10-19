import { createTRPCRouter, protectedProcedure } from '../init'
import prisma from '@/lib/database'

export const appRouter = createTRPCRouter({
  getAccounts: protectedProcedure.query(({ ctx }) => {
    console.log(ctx.auth.user.id)
    return prisma.account.findMany({
      where: {
        userId: ctx.auth.user.id
      }
    })
  })
})

export type AppRouter = typeof appRouter
