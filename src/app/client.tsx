'use client'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

interface Props {
  users: { id: number; name: string | null; email: string }[]
}

export const Client = () => {
  const trpc = useTRPC()
  const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions())

  return (
    <div className="flex flex-col gap-2">
      Client Component
      <ul>
        {users.map(user => (
          <li key={`user-${user.id}`}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
