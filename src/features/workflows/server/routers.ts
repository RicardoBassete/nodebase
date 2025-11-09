import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure
} from '@/trpc/init'
import z from 'zod'

export const workflowsRouter = createTRPCRouter({
  create: premiumProcedure.mutation(async ({ ctx }) => {
    return ctx.prisma.workflow.create({
      data: {
        userId: ctx.auth.user.id,
        name: 'TODO'
      }
    })
  }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id
        }
      })
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.workflow.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id
        },
        data: {
          name: input.name
        }
      })
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.workflow.findUnique({
        where: {
          id: input.id,
          userId: ctx.auth.user.id
        }
      })
    }),
  getMany: protectedProcedure.query(async ({ ctx, input }) => {
    return ctx.prisma.workflow.findMany({
      where: {
        userId: ctx.auth.user.id
      }
    })
  })
})
