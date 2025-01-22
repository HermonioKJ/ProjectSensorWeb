import { Badge } from '@/components/ui/badge'
import { CheckIcon, ClockIcon } from 'lucide-react'
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <Badge variant={status === 'active' ? 'secondary' : 'default'}>
      {status === 'inactive' ? (
        <>
          Inactive
          <ClockIcon className="ml-1 w-4" />
        </>
      ) : null}
      {status === 'active' ? (
        <>
          Active
          <CheckIcon className="ml-1 w-4" />
        </>
      ) : null}
    </Badge>
  )
}