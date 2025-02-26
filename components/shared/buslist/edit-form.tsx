'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { State, updateEbus } from '@/lib/actions/modern-jeep-list-actions'
import { EbusForm } from '@/types'
import { CheckIcon, ClockIcon, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'

export default function EditEbusForm({ebus,}: {ebus: EbusForm}) {
  const initialState: State = { message: null, errors: {} }
  const updateEbusWithId = updateEbus.bind(null, ebus.id)
  const [state, formAction] = useActionState(updateEbusWithId, initialState)

  // Local state for form fields, ensuring it updates when `ebus` changes
  const [formData, setFormData] = useState<EbusForm>(ebus)

  useEffect(() => {
    setFormData(ebus)
  }, [ebus])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form action={formAction}>
      <div className="rounded-md p-4 md:p-6">
        {/* License No. */}
        <div className="mb-4">
          <label htmlFor="license" className="mb-2 block text-sm font-medium">
            License No.
          </label>
          <div className="relative">
            <input
              id="license"
              name="license"
              type="text"
              value={formData.license}
              onChange={handleChange}
              className="peer block w-full rounded-md border py-2 px-5 text-sm outline-2"
              aria-describedby="license-error"
            />
          </div>
          <div id="license-error" aria-live="polite" aria-atomic="true">
            {state.errors?.license &&
              state.errors.license.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Route */}
        <div className="mb-4">
          <label htmlFor="route" className="mb-2 block text-sm font-medium">
            Route
          </label>
          <input
            id="route"
            name="route"
            type="text"
            value={formData.route}
            onChange={handleChange}
            className="peer block w-full rounded-md border py-2 text-sm outline-2 px-5"
            aria-describedby="route-error"
          />
          <div id="route-error" aria-live="polite" aria-atomic="true">
            {state.errors?.route &&
              state.errors.route.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Total Passengers */}
        <div className="mb-4">
          <label htmlFor="total_passengers" className="mb-2 block text-sm font-medium">
            Total Passengers
          </label>
          <input
            id="total_passengers"
            name="total_passengers"
            type="string"
            value={formData.total_passengers} // Now using formData
            onChange={handleChange}
            className="peer block w-full rounded-md border py-2 text-sm outline-2 px-5"
            aria-describedby="total_passengers-error"
          />
          <div id="total_passengers-error" aria-live="polite" aria-atomic="true">
            {state.errors?.total_passengers &&
              state.errors.total_passengers.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Status */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Set the Ebus Status
          </legend>
          <div className="rounded-md border px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="inactive"
                  name="status"
                  type="radio"
                  value="inactive"
                  checked={formData.status === 'inactive'} // Now using formData
                  onChange={handleChange}
                  className="h-4 w-4 focus:ring-2"
                />
                <label
                  htmlFor="inactive"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                >
                  Inactive <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  checked={formData.status === 'active'} // Now using formData
                  onChange={handleChange}
                  className="h-4 w-4 focus:ring-2"
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                >
                  Active <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* General Error Message */}
        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="my-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>

      {/* Form Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Button variant="ghost">
          <Link href="/dashboard/modern-jeeps">Cancel</Link>
        </Button>
        <Button type="submit">Edit Ebus</Button>
      </div>
    </form>
  )
}
