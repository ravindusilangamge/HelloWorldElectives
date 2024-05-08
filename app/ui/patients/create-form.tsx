
'use client'

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { addPatient } from '@/app/lib/actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';

export default function Form() {
  const [startDate, setStartDate] = useState<Date | null>(null);

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
            Enter the birthday.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <DatePicker
                id="birthdate"
                name="birthdate"
                selected={startDate}
                onChange={(date) => setStartDate(date)} // Handles both setting date and clearing date
                showYearDropdown
                dateFormat="yyyy-MM-dd"
                yearDropdownItemNumber={119}
                scrollableYearDropdown
                placeholderText="YYYY-MM-DD"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Gender Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Gender?
          </legend>
          <div className="rounded-md mb-4 border border-gray-200 bg-white px-[14px] py-3">
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
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-200 px-3 py-1.5 text-xs font-medium text-gray-600"
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
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-pink-200 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Female {/* <CheckIcon className="h-4 w-4" /> */}
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <div className="mb-4">
          <label htmlFor="age" className="mb-2 block text-sm font-medium">
            Enter the Phone number.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phonenumber"
                name="phonenumber"
                type="string"
                placeholder="Enter the phone number..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

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

        <div className="mb-4">
        <label htmlFor="name" className="mb-2 mt-2 block text-sm font-medium">
          Past Medical History
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <textarea
              id="pmhx"
              name="pmhx"
              placeholder="Enter Past Medical History..."
              className="peer block w-full mb-4 rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
              rows={4} // Specify the number of visible text lines
             />
           </div>
        </div>

        <fieldset>
          <legend className="mb-2 mt-2 block text-sm font-medium">
            Chronic Diseases?
          </legend>
          <div className="rounded-md mb-4 border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="dm"
                  name="dm"
                  type="checkbox"
                  value="true"
                  defaultValue="false"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="dm"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   DM 
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="htn"
                  name="htn"
                  type="checkbox"
                  value="true"
                  defaultValue="false"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="htn"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   HTN {/* <CheckIcon className="h-4 w-4" /> */}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="dl"
                  name="dl"
                  type="checkbox"
                  value="true"
                  defaultValue="false"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="dl"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   DL 
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="ba"
                  name="ba"
                  type="checkbox"
                  value="true"
                  defaultValue="false"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="ba"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   BA 
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        </div>

        <div className="mb-4">
        <fieldset>
          <legend className="mb-2 mt-2 block text-sm font-medium">
            Allergies?
          </legend>
          <div className="rounded-md mb-4 border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="food"
                  name="food"
                  type="checkbox"
                  value="true"
                  defaultValue="false"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="food"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Food 
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="drugs"
                  name="drugs"
                  type="checkbox"
                  value="true"
                  defaultValue="false"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="drugs"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-cyan-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Drugs {/* <CheckIcon className="h-4 w-4" /> */}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="plaster"
                  name="plaster"
                  type="checkbox"
                  value="true"
                  defaultValue="false"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="plaster"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Plaster 
                </label>
              </div>
              
            </div>
          </div>
        </fieldset>
        <label htmlFor="allergy" className="mb-2 mt-2 block text-sm font-medium">
          Details of Allergies
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <textarea
              id="allergy"
              name="allergy"
              placeholder="Enter details of allergies..."
              className="peer block w-full mb-4 rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
              rows={4} // Specify the number of visible text lines
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
