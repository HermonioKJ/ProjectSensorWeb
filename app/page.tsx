// Add this directive to mark the file as a client component
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    // This will redirect the user to the login page when this component mounts
    router.push('/login')
  }, [router]) // Add router as a dependency to ensure proper behavior

  return (
    <main className="flex min-h-screen flex-col">

    </main>
  )
}
