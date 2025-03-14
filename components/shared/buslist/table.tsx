import { fetchFilteredEbus } from '@/lib/actions/modern-jeep-list-actions'
import InvoiceStatus from './status'
import { DeleteEbus, UpdateEbus } from './buttons'
import { Dialog, DialogClose, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import PreviewBusForm from './preview-form'

export default async function EbusTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {

  const ebuses = await fetchFilteredEbus (query, currentPage)
    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg p-2 md:pt-0">

              {/* Mobile View */}
            <div className="md:hidden">
              {ebuses?.map((ebus) => (
                <div key={ebus.id} className="mb-2 w-full rounded-md  p-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="text-sm text-muted">{ebus.route}</p>
                    </div>
                    <InvoiceStatus status={ebus.IsActive} />
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {ebus.TotalPass} / {ebus.CurrentPass}
                      </p>
                      <p className='text-red-500'>{ebus.Disc}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateEbus id={ebus.id} />
                      <Dialog>
                        <DialogTrigger asChild>
                        <Button variant="outline" type="submit">
                          <span className="sr-only">Delete</span>
                          <TrashIcon className="w-5" />
                      </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader className='gap-y-5'>
                            <DialogTitle className='font-bold'>Delete Modern Jeep entry</DialogTitle>
                            <DialogDescription>Are you sure to delete this modern jeep entry?</DialogDescription>
                            <div className='flex flex-row gap-x-5 justify-end'>
                              <DialogClose asChild>
                              <Button className='sm:max-w-[75px] w-[75px]'>No</Button>
                              </DialogClose>
                            <DeleteEbus id={ebus.id}></DeleteEbus>
                            </div>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop View */}
            <table className="hidden min-w-full   md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Bus ID
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    License No.
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Route
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Passengers
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-center">
                    Discrepancy
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ebuses?.map((ebus) => (
                  <tr
                    key={ebus.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                          <button>
                          <p className='underline'>{ebus.id}</p>
                          </button>
                          </DialogTrigger>

                          <DialogContent className='sm-w-md max-w-fit'>
                            <DialogHeader>
                              <DialogTitle className='font-bold'>
                                Preview Bus No. {ebus.id}
                              </DialogTitle>
                            </DialogHeader>
                              <PreviewBusForm id={ebus.id}></PreviewBusForm>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3"> 
                      <div className="flex items-center gap-3">
                        <p>{ebus.license}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <p>{ebus.route}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <InvoiceStatus status={ebus.IsActive}></InvoiceStatus>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                    <p>{ebus.CurrentPass} / {ebus.TotalPass}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-center">
                    <p className='text-red-500 font-bold '>{ebus.Disc}</p>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateEbus id={ebus.id} />
                      <Dialog>
                        <DialogTrigger asChild>
                        <Button variant="outline" type="submit">
                          <span className="sr-only">Delete</span>
                          <TrashIcon className="w-5" />
                      </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader className='gap-y-5'>
                            <DialogTitle className='font-bold'>Delete Modern Jeep entry</DialogTitle>
                            <DialogDescription>Are you sure to delete this modern jeep entry?</DialogDescription>
                            <div className='flex flex-row gap-x-5 justify-end'>
                              <DialogClose asChild>
                              <Button className='sm:max-w-[75px] w-[75px]'>No</Button>
                              </DialogClose>
                            <DeleteEbus id={ebus.id}></DeleteEbus>
                            </div>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }