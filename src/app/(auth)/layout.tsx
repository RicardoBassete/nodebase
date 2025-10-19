import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  return (
    <div className="bg-muted min-h-svh flex flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image
            src={'/logos/logo.svg'}
            alt="Nodebase"
            width={30}
            height={30}
          />
          Nodebase
        </Link>
        {props.children}
      </div>
    </div>
  )
}
