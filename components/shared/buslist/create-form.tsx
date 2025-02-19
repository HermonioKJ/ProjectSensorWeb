'use client'

import { Button } from '@/components/ui/button'
import { createEbus, State } from '@/lib/actions/modern-jeep-list-actions'
import { EbusForm } from '@/types'
import { CheckIcon, ClockIcon, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'

export default function Form({ ebus }: { ebus: EbusForm[] }) {
  const initialState: State = { message: null, errors: {} }
  const [state, formAction] = useActionState(createEbus, initialState)

  return (
    <form action={formAction}>
      <div className="rounded-md p-4 md:p-6">

        {/* License No. */}
        <div className="mb-4">
          <label htmlFor="license" className="mb-2 block text-sm font-medium">
            License No.
          </label>
          <div className="relative">
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 " />
            <input
              id="license"
              name="license"
              type="text"
              placeholder="Enter license plate"
              className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2"
              aria-describedby="license-error"
            />
          </div>
          <div id="license-error" aria-live="polite" aria-atomic="true">
            {state.errors?.license && state.errors.license.map((error: string) => (
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
          <div className="relative">
            <input
              id="route"
              name="route"
              type="text"
              placeholder="Enter route"
              className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2"
              aria-describedby="route-error"
            />
          </div>
          <div id="route-error" aria-live="polite" aria-atomic="true">
            {state.errors?.route && state.errors.route.map((error: string) => (
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
          <div className="relative">
            <input
              id="total_passengers"
              name="total_passengers"
              type="number"
              placeholder="Enter total passengers"
              className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2"
              aria-describedby="total_passengers-error"
            />
          </div>
          <div id="total_passengers-error" aria-live="polite" aria-atomic="true">
            {state.errors?.total_passengers && state.errors.total_passengers.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Status (Active/Inactive) */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the Ebus Status
          </legend>
          <div className="rounded-md border px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  className="h-4 w-4 cursor-pointer focus:ring-2"
                />
                <label htmlFor="active" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium">
                  Active <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="inactive"
                  name="status"
                  type="radio"
                  value="inactive"
                  className="h-4 w-4 cursor-pointer focus:ring-2"
                />
                <label htmlFor="inactive" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium">
                  Inactive <ClockIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status && state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </fieldset>

        {/* Error Message */}
        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/modern-jeeps">Cancel</Link>
        </Button>
        <Button type="submit">Create Ebus</Button>
      </div>
    </form>
  )
}


// // 
//         {/* Current Passengers */}
//         <div className="mb-4">
//           <label htmlFor="current_passengers" className="mb-2 block text-sm font-medium">
//             Current Passengers
//           </label>
//           <div className="relative">
//             <input
//               id="current_passengers"
//               name="current_passengers"
//               type="number"
//               placeholder="Enter current passengers"
//               className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2"
//               aria-describedby="current_passengers-error"
//             />
//           </div>
//           <div id="current_passengers-error" aria-live="polite" aria-atomic="true">
//             {state.errors?.current_passengers && state.errors.current_passengers.map((error: string) => (
//               <p className="mt-2 text-sm text-red-500" key={error}>
//                 {error}
//               </p>
//             ))}
//           </div>
//         </div>

//         {/* Discrepancy */}
//         <div className="mb-4">
//           <label htmlFor="discrepancy" className="mb-2 block text-sm font-medium">
//             Discrepancy
//           </label>
//           <div className="relative">
//             <input
//               id="discrepancy"
//               name="discrepancy"
//               type="number"
//               placeholder="Enter discrepancy"
//               className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2"
//               aria-describedby="discrepancy-error"
//             />
//           </div>
//           <div id="discrepancy-error" aria-live="polite" aria-atomic="true">
//             {state.errors?.discrepancy && state.errors.discrepancy.map((error: string) => (
//               <p className="mt-2 text-sm text-red-500" key={error}>
//                 {error}
//               </p>
//             ))}
//           </div>
//         </div>

//         {/* Coop ID */}
//         <div className="mb-4">
//           <label htmlFor="coop_id" className="mb-2 block text-sm font-medium">
//             Coop ID
//           </label>
//           <div className="relative">
//             <input
//               id="coop_id"
//               name="coop_id"
//               type="text"
//               placeholder="Enter coop ID"
//               className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2"
//               aria-describedby="coop_id-error"
//             />
//           </div>
//           <div id="coop_id-error" aria-live="polite" aria-atomic="true">
//             {state.errors?.coop_id && state.errors.coop_id.map((error: string) => (
//               <p className="mt-2 text-sm text-red-500" key={error}>
//                 {error}
//               </p>
//             ))}
//           </div>
//         </div>

//         {/* Driver ID */}
//         <div className="mb-4">
//           <label htmlFor="driver_id" className="mb-2 block text-sm font-medium">
//             Driver ID
//           </label>
//           <div className="relative">
//             <input
//               id="driver_id"
//               name="driver_id"
//               type="text"
//               placeholder="Enter driver ID"
//               className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2"
//               aria-describedby="driver_id-error"
//             />
//           </div>
//           <div id="driver_id-error" aria-live="polite" aria-atomic="true">
//             {state.errors?.driver_id && state.errors.driver_id.map((error: string) => (
//               <p className="mt-2 text-sm text-red-500" key={error}>
//                 {error}
//               </p>
//             ))}
//           </div>
//         </div>

//         {/* Conductor ID */}
//         <div className="mb-4">
//           <label htmlFor="conductor_id" className="mb-2 block text-sm font-medium">
//             Conductor ID
//           </label>
//           <div className="relative">
//             <input
//               id="conductor_id"
//               name="conductor_id"
//               type="text"
//               placeholder="Enter conductor ID"
//               className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2"
//               aria-describedby="conductor_id-error"
//             />
//           </div>
//           <div id="conductor_id-error" aria-live="polite" aria-atomic="true">
//             {state.errors?.conductor_id && state.errors.conductor_id.map((error: string) => (
//               <p className="mt-2 text-sm text-red-500" key={error}>
//                 {error}
//               </p>
//             ))}
//           </div>
//         </div>