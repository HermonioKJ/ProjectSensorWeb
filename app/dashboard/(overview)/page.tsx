import LatestEbus from '@/components/shared/dashboard/latest-ebus'
// import NameCard from '@/components/shared/dashboard/name-card-wrapper'
import RevenueChartWrapper from '@/components/shared/dashboard/revenue-chart-wrapper'
import StatCardsWrapper from '@/components/shared/dashboard/stat-cards-wrapper'
// import ViewButton from '@/components/shared/dashboard/ViewButton'
import { roboto } from '@/components/shared/fonts'
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/components/shared/skeletons'
// import { Button } from '@/components/ui/button'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <main className="flex gap-10 mx-5">
      {/* For the Dashboard Content */}
      <div className="w-full md:w-[65%] lg:w-[65%] flex flex-col gap-6"> 
        <h1 className={`${roboto.className} font-bold text-xl md:text-2xl`}>
          Dashboard
        </h1>
        {/* <Suspense fallback={<CardsSkeleton />}>
          <NameCard />
        </Suspense> */}
        <Suspense fallback={<CardsSkeleton />}>
          <StatCardsWrapper />
        </Suspense>
        <div className='flex flex-row w-full gap-10'>
        {/* <ViewButton className='w-full py-14 text-left text-2xl'>Add new <br></br> Ebus</ViewButton>
          <Button className='w-full py-14 text-left'>
            <span className='text-2xl'>View History <br></br>Tab</span>
          </Button> */}
        </div>

        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestEbus />
        </Suspense>
      </div>

      {/* For the recent updates panel */}
      <div className="flex flex-col w-full md:w-[35%] lg:w-[35%] gap-6">
        <h1 className={`${roboto.className} font-bold text-xl md:text-2xl`}>
          Recent Activity
        </h1>
         <div className="grid gap-6 sm:grid-cols-1 lg:grid-rows-1">
        </div>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChartWrapper />
        </Suspense>
      </div>
    </main>
  )
}
