'use client'

import { Button } from '@/components/ui/button'
import { deleteEbus } from '@/lib/actions/modern-jeep-list-actions'
import { PencilIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import {toast, Toaster} from 'sonner'

export function UpdateEbus({ id }: { id: string }) {
  return (
    <Button variant="outline" asChild>
      <Link href={`/dashboard/modern-jeeps/${id}/edit`}>
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  )
}

export function DeleteEbus({ id }: { id: string }) {
  const deleteEbusWithID = deleteEbus.bind(null, id)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    await deleteEbusWithID(); 
    toast.success("Deleted Succesfully")
  }

    return (
      <>
          <form onSubmit={handleSubmit}>
          <Button type="submit" className='bg-red-700' >
              <span className='sm:max-w-[50px] w-[50px]'>Yes</span>
          </Button>
        </form>
      </>
    )
}

