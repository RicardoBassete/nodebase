import { AppHeader } from '@/components/app-header'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <AppHeader />
      <main className="flex-1">{children}</main>
    </>
  )
}
