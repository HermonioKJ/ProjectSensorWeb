import { lusitana, roboto } from '@/components/shared/fonts'
import Pagination from '@/components/shared/buslist/pagination'
import InvoicesTable from '@/components/shared/buslist/table'
import Search from '@/components/shared/search'
import { InvoicesTableSkeleton } from '@/components/shared/skeletons'
import { fetchInvoicesPages } from '@/lib/actions/invoice-actions'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Invoices',
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  // Handle query and page values
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  // Await async function to fetch total pages
  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${roboto.className} text-2xl`}>Modern Jeeps</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search modern jeepneys..." />
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
