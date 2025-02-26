import Link from "next/link";
import { inter } from "./fonts";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function RegisterForm(){
    return(
        <form>
        <div>
        <h1 className={`${inter.className} text-2xl font-bold`}>
          Register
        </h1>
        <Link href="/login" className={`${inter.className} text-sm`}>
          Already have have an account? 
          <span className="underline ml-1">Login</span>
        </Link>
        </div>
        <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="email"
            >
              Email*
        </label>
        <input                 
                className="peer block w-full rounded-md border py-[9px] pl-3 text-sm outline-2  "
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
        >
        </input>

        <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="password"
            >
              Password*
        </label>
        <input                 
                className="peer block w-full rounded-md border py-[9px] pl-3 text-sm outline-2  "
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
        >
        </input>

        <div className="flex flex-row justify-start w-full gap-x-5">
            <div className="flex flex-col w-full">
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="firstName"
            >
              First name*
            </label>
            <input                 
                    className="peer block w-full rounded-md border py-[9px] pl-3 text-sm outline-2  "
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder="e.x. Juan"
                    required
            >
            </input>
            </div>
            <div className="flex flex-col w-full">
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="lastName"
            >
              Last Name*
            </label>
            <input                 
                    className="peer block w-full rounded-md border py-[9px] pl-3 text-sm outline-2  "
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="e.x. de la Cruz"
                    required
            >
            </input>
            </div>
        </div>

        <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="phoneNo"
            >
              Phone Number*
        </label>
        <input                 
                className="peer block w-full rounded-md border py-[9px] pl-3 text-sm outline-2  "
                id="phoneNo"
                type="text"
                name="phoneNo"
                placeholder="Enter your phone number"
                required
        >
        </input>

        <div className="flex flex-row justify-start w-full gap-x-5">
            <div className="flex flex-col w-full">
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="region"
            >
              Region*
            </label>
            <input                 
                    className="peer block w-full rounded-md border py-[9px] pl-3 text-sm outline-2  "
                    id="region"
                    type="text"
                    name="region"
                    placeholder="e.x. Region 6"
                    required
            >
            </input>
            </div>
            <div className="flex flex-col w-full">
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="lastName"
            >
              Province*
            </label>
            <input                 
                    className="peer block w-full rounded-md border py-[9px] pl-3 text-sm outline-2  "
                    id="province"
                    type="text"
                    name="province"
                    placeholder="e.x. Iloilo"
                    required
            >
            </input>
            </div>
        </div>

        <div className="flex flex-row justify-start w-full gap-x-5">
            <div className="flex flex-col w-full">
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="city"
            >
              City*
            </label>
            <input                 
                    className="peer block w-full rounded-md border py-[9px] pl-3 text-sm outline-2  "
                    id="city"
                    type="text"
                    name="city"
                    placeholder="e.x. Iloilo City"
                    required
            >
            </input>
            </div>
            <div className="flex flex-col w-full">
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="barangay"
            >
              Barangay*
            </label>
            <input                 
                    className="peer block w-full rounded-md border py-[9px] pl-3 text-sm outline-2  "
                    id="barangay"
                    type="text"
                    name="barangay"
                    placeholder="e.x. Jaro"
                    required
            >
            </input>
            </div>
        </div>

        {/* <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <CircleAlert className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div> */}

        <div className="mt-4 justify-center items-center">
          <Button type="submit" style={{backgroundColor: '#4caf50'}} className='mt-5'>
            Register <ArrowRightIcon className="ml-auto h-5 w-5" />
          </Button>
        </div>

        </form>
    )
}