import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { fetchLatestEbus } from '@/lib/actions/invoice-actions'
import { roboto } from '../fonts'
import { cn } from '@/lib/utils'
import { RefreshCcw } from 'lucide-react'
import { Key } from 'react'
import ViewButton from './ViewButton'

export default async function LatestEbus() {
  const ebusData = await fetchLatestEbus()
  return (
    <Card className="flex w-full flex-col md:col-span-4">
      <CardHeader>
        <div className='flex flex-row justify-between'>
        <h2 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
          Latest Bus Data
        </h2>
        <ViewButton className='flex'>View All</ViewButton>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            {ebusData.map((ebus: { id: Key | null | undefined; license: string; route: string; total_passengers: number; current_passengers: number, discrepancy: number }, i: number) => {
              return (
                <div
                  key={ebus.id}
                  className={cn(
                    'flex flex-row items-center justify-between py-4',
                    {
                      'border-t': i !== 0,
                    }
                  )}
                >
                  <div className="flex items-center">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base">
                        License: {ebus.license}
                      </p>
                      <p className="truncate text-sm text-gray-500 md:text-base">
                        Route: {ebus.route}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className={`${roboto.className} truncate text-sm font-medium md:text-base`}>
                      Total Passengers: {ebus.total_passengers}
                    </p>
                    <p className={`${roboto.className} truncate text-sm font-medium md:text-base`}>
                      Current Passengers: {ebus.current_passengers}
                    </p>
                    <p className={`${roboto.className} truncate text-sm font-medium md:text-base text-red-500`}>
                      Discrepancy: {ebus.discrepancy}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex items-center pb-2 pt-6">
            <RefreshCcw className="h-5 w-5 text-gray-500" />
            <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}