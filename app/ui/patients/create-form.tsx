//import { PatientsTableType } from '@/app/lib/definitions';
import Link from 'next/link';
// import {
//   CheckIcon,
//   ClockIcon,
// } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { addPatient } from '@/app/lib/actions';

export default function Form() {
  return (
    <form action={addPatient}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="p_id" className="mb-2 block text-sm font-medium">
            Enter the Id no.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="p_id"
                name="p_id"
                type="string"
                placeholder="Enter Id"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Enter the name.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="age" className="mb-2 block text-sm font-medium">
            Enter the age.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="age"
                name="age"
                type="string"
                placeholder="Enter age"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Gender?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  value="male"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="male"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Male {/* <ClockIcon className="h-4 w-4" /> */}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  value="female"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="female"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Female {/* <CheckIcon className="h-4 w-4" /> */}
                </label>
              </div>
            </div>
          </div>
        </fieldset>

      {/* Invoice Amount */}
      <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Enter the address.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="address"
                name="address"
                type="string"
                placeholder="Enter address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/patients"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Patient</Button>
      </div>
    </form>
  );
}
