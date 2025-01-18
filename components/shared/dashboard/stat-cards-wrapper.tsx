import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { fetchCardData } from '@/lib/actions/invoice-actions'
import { BanknoteIcon, ClockIcon, InboxIcon, UsersIcon } from 'lucide-react' // icon
import { roboto } from '../fonts'

import './cards.css'

const iconMap = {
  collected: BanknoteIcon,
  customers: UsersIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
}

export default async function StatCardsWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData()

  return (
    <div className="grid grid-cols-2 gap-8">
      <StatCard title="Collected" value={totalPaidInvoices} type="collected" />
      <StatCard title="Pending" value={totalPendingInvoices} type="pending" />
      <StatCard title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <StatCard title="Total Customers" value={numberOfCustomers} type="customers" />
    </div>
  )
}

export function StatCard({
  title,
  value,
  type,
}: {
  title: string
  value: number | string
  type: 'invoices' | 'customers' | 'pending' | 'collected'
}) {
  const Icon = iconMap[type]

  return (
    <Card className="cards">
      <CardHeader className="flex flex-row space-y-0 space-x-3">
        {Icon ? <Icon className="h-5 w-5" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </CardHeader>

      <CardContent className="cards-content">
        <p className={`${roboto.className} truncate px-7 py-1 text-3xl`}>
          {value}
        </p>
        <p className={`${roboto.className} truncate px-7 py-1 text-md`}>
          {/* {value}  */}
          42% more than yesterday
        </p>
      </CardContent>
    </Card>
  )
}
