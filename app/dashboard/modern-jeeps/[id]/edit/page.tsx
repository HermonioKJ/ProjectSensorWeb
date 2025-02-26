import Breadcrumbs from '@/components/shared/buslist/breadcrumbs'
import EditEbusForm from '@/components/shared/buslist/edit-form'
import { editfetchebus, fetchebus } from '@/lib/actions/edit-add-ebus-actions'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit Modern Jeep',
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [ebus] = await editfetchebus(id)

  if (!ebus) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Modern Jeeps', href: '/dashboard/modern-jeeps' },
          {
            label: 'Edit Modern Jeep Entries',
            href: `/dashboard/modern-jeeps/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditEbusForm ebus={ebus} />
    </main>
  )
}
