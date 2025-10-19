import { AuthLayout } from '@/features/auth/components/auth-layout'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  return <AuthLayout>{props.children}</AuthLayout>
}
