'use client'

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { addDrug } from '@/app/lib/actions';
import React, { useState } from 'react';

export default function Form() {

  return (
    <form action={addDrug}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="drug_name_generic" className="mb-2 block text-sm font-medium">
            Enter the Generic name.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="drug_name_generic"
                name="drug_name_generic"
                type="string"
                placeholder="Enter the generic name..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        
        {/* <div className="mb-4">
          <label htmlFor="drug_brand" className="mb-2 block text-sm font-medium">
            Enter the drug formulation.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="drug_form"
                name="drug_form"
                type="string"
                placeholder="Enter the drug formulation..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>  */}

        {/* Invoice Amount */}
        {/* <div className="mb-4">
          <label htmlFor="manufacturer" className="mb-2 block text-sm font-medium">
            Enter the Manufacturer.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <input
                id="manufacturer"
                name="manufacturer"
                type="string"
                placeholder="Enter the manufacturer..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div> */}

        {/* <div className="mb-4">
          <label htmlFor="drug_dose" className="mb-2 block text-sm font-medium">
            Enter the Dose.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="drug_dose"
                name="drug_dose"
                type="string"
                placeholder="Enter the drug dose..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div> */}

        {/* Gender Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Drug Formulation?
          </legend>
          <div className="rounded-md mb-4 border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="tablet"
                  name="drug_form"
                  type="radio"
                  value="Tablet"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="tablet"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-300 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Tablet 
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="syrup"
                  name="drug_form"
                  type="radio"
                  value="Syrup"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="syrup"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-orange-300 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Syrup
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="cream"
                  name="drug_form"
                  type="radio"
                  value="Cream"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="cream"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-300 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Cream 
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="eye_ear_nosedrop"
                  name="drug_form"
                  type="radio"
                  value="Eye/Ear/Nose Drop"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="eye_ear_nosedrop"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-300 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Eye/Ear/Nose Drop 
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="capsule"
                  name="drug_form"
                  type="radio"
                  value="Capsule"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="capsule"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-300 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Capsule 
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="inhaler"
                  name="drug_form"
                  type="radio"
                  value="Inhaler"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="inhaler"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-purple-300 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                   Inhaler 
                </label>
              </div>

            </div>
          </div>
        </fieldset>

        

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/drugs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Drug</Button>
      </div>
    </form>
  );
}