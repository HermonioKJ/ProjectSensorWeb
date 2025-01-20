'use client'

import { Button } from '@/components/ui/button'
import { deleteInvoice } from '@/lib/actions/invoice-actions'
import { PencilIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Button variant="outline" asChild>
      <Link href={`/dashboard/modern-jeeps/${id}/edit`}>
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  )
}

export function DeleteInvoice({ id }: { id: string }) {
    const deleteInvoiceWithId = deleteInvoice.bind(null, id)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()  // Prevent default form submission
        deleteInvoiceWithId()   // Call the delete function
      }

    return (
        <form onSubmit={handleSubmit}>
        <Button variant="outline" type="submit">
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
        </Button>
        </form>
    )
    }