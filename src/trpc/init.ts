import { inngest } from '@/inngest/client'
import { auth } from '@/lib/auth'
import prisma from '@/lib/database'
import { initTRPC, TRPCError } from '@trpc/server'
import { headers } from 'next/headers'
import { cache } from 'react'

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return { inngest, prisma, auth: session }
})

type Context = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.context<Context>().create()

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const auth = ctx.auth

  if (!auth) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized'
    })
  }

  return next({ ctx: { ...ctx, auth } })
})
