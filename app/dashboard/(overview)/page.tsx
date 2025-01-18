import LatestInvoices from '@/components/shared/dashboard/latest-invoices'
import NameCard from '@/components/shared/dashboard/name-card-wrapper'
import RevenueChartWrapper from '@/components/shared/dashboard/revenue-chart-wrapper'
import StatCardsWrapper from '@/components/shared/dashboard/stat-cards-wrapper'
import { roboto } from '@/components/shared/fonts'
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/components/shared/skeletons'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <main className="flex gap-10 mx-5">
      {/* For the Dashboard Content */}
      <div className="w-full md:w-[65%] lg:w-[65%] flex flex-col gap-6"> 
        <h1 className={`${roboto.className} font-bold text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <Suspense fallback={<CardsSkeleton />}>
          <NameCard />
        </Suspense>
        <Suspense fallback={<CardsSkeleton />}>
          <StatCardsWrapper />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
        {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CardsSkeleton />
        </div> */}
        {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <RevenueChartSkeleton />
          <LatestInvoicesSkeleton />
        </div> */}
      </div>

      {/* For the recent updates panel */}
      <div className="flex flex-col w-full md:w-[35%] lg:w-[35%] gap-6">
        <h1 className={`${roboto.className} font-bold text-xl md:text-2xl`}>
          Recent Activity
        </h1>
         <div className="grid gap-6 sm:grid-cols-1 lg:grid-rows-1">
          <CardsSkeleton />
        </div>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChartWrapper />
        </Suspense>
      </div>
    </main>
  )
}
