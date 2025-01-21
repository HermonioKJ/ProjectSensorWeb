import { roboto } from '@/components/shared/fonts'
import Pagination from '@/components/shared/buslist/pagination'
import InvoicesTable from '@/components/shared/buslist/table'
import Search from '@/components/shared/search'
import { InvoicesTableSkeleton } from '@/components/shared/skeletons'
import { Button } from '@/components/ui/button'
import { fetchInvoicesPages } from '@/lib/actions/invoice-actions'
import { PlusIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Modern Jeeps',
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  // Await the searchParams since it is now a Promise
  const resolvedSearchParams = await searchParams || {}

  const query = resolvedSearchParams.query || ''
  const currentPage = Number(resolvedSearchParams.page) || 1

  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${roboto.className} text-2xl`}>Modern Jeeps</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <Button asChild>
          <Link href="/dashboard/modern-jeeps/create">
            <span className="hidden md:block">Create Modern Jeeps</span>
            <PlusIcon className="h-5 md:ml-4" />
          </Link>
        </Button>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
