'use client';

import { PatientsTableType } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updatePatient } from '@/app/lib/actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';

export default function Form({
  patient,
}: {
  patient: PatientsTableType;
}) {
  const [startDate, setStartDate] = useState<Date | null>(new Date(patient.birthdate));
  const updatePatientWithId = updatePatient.bind(null, patient.p_id);
  return (
    <form action={updatePatientWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {/* Id */}
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
                defaultValue={patient.p_id}
                placeholder="Enter Id"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Name */}
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
                defaultValue={patient.name}
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Birthdate */}
        <div className="mb-4">
          <label htmlFor="birthdate" className="mb-2 block text-sm font-medium">
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
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  value="male"
                  defaultChecked={patient.gender === 'male'}
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
                  defaultChecked={patient.gender === 'female'}
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

        <div className="mb-4 mt-4">
          <label htmlFor="phonenumber" className="mb-2 block text-sm font-medium">
            Enter the Phone number.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phonenumber"
                name="phonenumber"
                type="string"
                defaultValue={patient.phonenumber}
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
                defaultValue={patient.address}
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
        <Button type="submit">Update Patient</Button>
      </div>
    </form>
  );
}
