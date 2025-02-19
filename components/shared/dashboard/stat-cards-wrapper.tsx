'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { fetchCardStat } from '@/lib/actions/dashboard-actions'
import { BanknoteIcon, ClockIcon, InboxIcon, UsersIcon } from 'lucide-react' // icon
import { roboto } from '../fonts'
import { useEffect, useState } from 'react';
import './cards.css'
import { CardsSkeleton } from '../skeletons';

const iconMap = {
  collected: BanknoteIcon,
  customers: UsersIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
}

export default function StatCardsWrapper() {

  interface StatData {
    EbusCount: number;
    TotalDiscrepency: number;
    TotalPassengers: number;
    CurrentPassengers: number;
  }

  const [stats, setStats] = useState<StatData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const fetchedStats = await fetchCardStat();
        setStats(fetchedStats); 
      } catch (error) {
        console.error('Failed to fetch card stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []); 

  if (loading) {
    return <CardsSkeleton />; 
  }

  const { EbusCount, TotalDiscrepency, TotalPassengers, CurrentPassengers } = stats || {};

  return (
    <div className="grid grid-cols-2 gap-8">
      <StatCard title="Total No. of Ebuses" value={EbusCount ?? 0} type="collected" />
      <StatCard title="Total No. of Passengers" value={TotalPassengers ?? 0} type="pending" />
      <StatCard title="Total Discrepency" value={TotalDiscrepency ?? 0} type="invoices" />
      <StatCard title="Current Passengers" value={CurrentPassengers ?? 0} type="customers" />
    </div>
  );
}

export function StatCard({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

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
          {/* You can customize this value to reflect any dynamic text */}
          42% more than yesterday
        </p>
      </CardContent>
    </Card>
  );
}
