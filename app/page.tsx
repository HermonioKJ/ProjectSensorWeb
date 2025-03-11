'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {

    router.push('/login')
  }, [router]) 

  return (
    <main className="flex min-h-screen flex-col">

    </main>
  )
}
