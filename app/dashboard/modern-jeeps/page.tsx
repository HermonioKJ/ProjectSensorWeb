import { roboto } from '@/components/shared/fonts'
import Pagination from '@/components/shared/buslist/pagination'
import Search from '@/components/shared/search'
import { EJeepTableSkeleton } from '@/components/shared/skeletons'
import { Button } from '@/components/ui/button'
import { fetcEbusPages } from '@/lib/actions/invoice-actions'
import { PlusIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import EbusTable from '@/components/shared/buslist/table'

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

  const resolvedSearchParams = await searchParams || {}

  const query = resolvedSearchParams.query || ''
  const currentPage = Number(resolvedSearchParams.page) || 1

  const totalPages = await fetcEbusPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${roboto.className} text-2xl`}>Modern Jeeps</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search License/Route/Active Status..." />
        <Button asChild>
          <Link href="/dashboard/modern-jeeps/create">
            <span className="hidden md:block">Add Modern Jeeps</span>
            <PlusIcon className="h-5 md:ml-4" />
          </Link>
        </Button>
      </div>
      <Suspense key={query + currentPage} fallback={<EJeepTableSkeleton />}>
        <EbusTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
