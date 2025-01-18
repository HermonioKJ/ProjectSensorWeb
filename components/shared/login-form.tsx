'use client'

import { authenticate } from '@/lib/actions/user-actions'
import { useActionState } from 'react'
import { ArrowRightIcon, AtSign, CircleAlert, LockKeyhole } from 'lucide-react'
import { inter } from './fonts'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  )

  return (
    <form action={formAction}>
      <div className="flex-1 rounded-lg  px-6 pb-4">
        <h1 className={`${inter.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <Link href="/register" className={`${inter.className} text-sm`}>
          Don&apos;t have an account? 
          <span className="underline ml-1">Register</span>
        </Link>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="email"
            >
              Email*
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border   py-[9px] pl-10 text-sm outline-2  "
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2   " />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium  "
              htmlFor="password"
            >
              Password*
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border   py-[9px] pl-10 text-sm outline-2 "
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6} //minimum length of password
              />
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 " />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit" aria-disabled={isPending} style={{backgroundColor: '#4caf50'}} className='mt-5'>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5" />
          </Button>
        </div>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <CircleAlert className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  )
}