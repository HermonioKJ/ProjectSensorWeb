import Breadcrumbs from '@/components/shared/buslist/breadcrumbs'
import EditInvoiceForm from '@/components/shared/buslist/edit-form'
import { fetchCustomers } from '@/lib/actions/customer-actions'
import { fetchInvoiceById } from '@/lib/actions/invoice-actions'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit Invoice',
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object since it's now a Promise
  const { id } = await params

  // Fetch invoice and customers concurrently
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ])

  // If no invoice is found, show 404
  if (!invoice) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/modern-jeeps' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/modern-jeeps/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  )
}
