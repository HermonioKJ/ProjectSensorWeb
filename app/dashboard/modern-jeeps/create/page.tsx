import Breadcrumbs from '@/components/shared/buslist/breadcrumbs'
import Form from '@/components/shared/buslist/create-form'
import { fetchebus } from '@/lib/actions/edit-add-ebus-actions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Modern Jeep',
}

export default async function Page() {
  const ebus = await fetchebus()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Modern Jeeps', href: '/dashboard/modern-jeep' },
          {
            label: 'Add Modern Jeep',
            href: '/dashboard/modern-jeep/create',
            active: true,
          },
        ]}
      />
      <Form ebus={ebus} />
    </main>
  )
}