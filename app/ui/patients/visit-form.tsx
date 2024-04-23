'use client'
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { PatientsTableType } from '@/app/lib/definitions';
import { addVisit } from '@/app/lib/actions';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



export default function Form( values: {patient_id: string, patient_details: PatientsTableType[]}) {
    const {patient_details, patient_id} = values;
    console.log("these are patient details," ,{patient_details});
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return(
    <div>
        <form action={addVisit}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6"> 
                    <input
                        id="p_id"
                        name="p_id"
                        type="hidden"
                        defaultValue={patient_id}
                    />
                    <div className='mb-4'>
                    <label htmlFor="date" className="block text-sm font-medium mb-2">
                        Visit Date
                    </label>
                    <>{console.log(selectedDate)}</>
                    <DatePicker
                        id="date"
                        name='date'
                        selected={selectedDate || new Date()}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
                    <div className="mb-4">
                        <label htmlFor="p_id" className="mb-2 block text-sm font-medium">
                            Presenting Complain?
                        </label>
                        <div className="relative mt-2 mb-4 rounded-md">
                            <div className="relative">
                            <input
                                id="pCompl"
                                name="pCompl"
                                type="string"
                                placeholder="Enter Presenting Complain..."
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 mt-2 block text-sm font-medium">
                            History of presenting complain.
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <textarea
                                    id="hpc"
                                    name="hpc"
                                    placeholder="Enter history of presenting complaint..."
                                    className="peer block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                    rows={4} // Specify the number of visible text lines
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
                                    className="peer block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                    rows={4} // Specify the number of visible text lines
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 mt-2 block text-sm font-medium">
                            Allergies?
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <textarea
                                    id="allergy"
                                    name="allergy"
                                    placeholder="Enter details of allergy..."
                                    className="peer block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                    rows={2} // Specify the number of visible text lines
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 mt-2 block text-sm font-medium">
                            Examination findings.
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <textarea
                                    id="examination"
                                    name="examination"
                                    placeholder="Enter examination findings..."
                                    className="peer block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                    rows={4} // Specify the number of visible text lines
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 mt-2 block text-sm font-medium">
                            Investigations done so far.
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <textarea
                                    id="investigations_sofar"
                                    name="investigations_sofar"
                                    placeholder="Enter details of investigations done..."
                                    className="peer block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                    rows={4} // Specify the number of visible text lines
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 mt-2 block text-sm font-medium">
                            Treatment.
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <textarea
                                    id="prescribed_med"
                                    name="prescribed_med"
                                    placeholder="Treatment..."
                                    className="peer block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                    rows={4} // Specify the number of visible text lines
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 mt-2 block text-sm font-medium">
                            Investigations ordered.
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <textarea
                                    id="investigations_ordered"
                                    name="investigations_ordered"
                                    placeholder="Investigations ordered..."
                                    className="peer block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                    rows={2} // Specify the number of visible text lines
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                  href = {`/dashboard/patients/${patient_id}/edit/view`}
                  className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                  Cancel
                </Link>
                <Button type="submit">Add Visit</Button>
            </div>
        </form>
    </div>
    );
}