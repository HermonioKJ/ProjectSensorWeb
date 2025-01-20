import Breadcrumbs from '@/components/shared/buslist/breadcrumbs'
import Form from '@/components/shared/buslist/create-form'
import { fetchCustomers } from '@/lib/actions/customer-actions'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Create Invoice',
}
export default async function Page() {
  const customers = await fetchCustomers()
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/modern-jeeps' },
          {
            label: 'Create Invoice',
            href: '/dashboard/modern-jeeps/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  )
}