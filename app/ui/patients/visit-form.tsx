'use client'
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { PatientsTableType, DrugsTableType } from '@/app/lib/definitions';
import { addVisit } from '@/app/lib/actions';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { string } from 'zod';

let totalPrescription = '';

export default function Form( values: {patient_id: string, patient_details: PatientsTableType[], drugs: DrugsTableType[]}) {
    const {patient_details, patient_id, drugs} = values;
    
    console.log("these are patient details," ,{patient_details});
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    
    const [selectedDrug, setSelectedDrug] = useState('');
    const [query, setQuery] = useState('');

    const filteredDrug =
    query === ''
      ? drugs
      : drugs.filter((drug) => {
          return drug.drug_name_generic.toLowerCase().includes(query.toLowerCase())
        });
     

    // Function to calculate total quantity
    function prescriptionNote() {
        const drugGenNameInput = document.getElementById("drugGenName") as HTMLInputElement;
        const drugDoseInput = document.getElementById("drugDose") as HTMLInputElement;
        const drugFreqInput = document.getElementById("freq") as HTMLInputElement;
        const drugDaysInput = document.getElementById("days") as HTMLInputElement;
        const totalPrescriptionInput = document.getElementById("prescribed_med") as HTMLInputElement;
    
        const drugGenName = (drugGenNameInput.value);
        const drugDose = (drugDoseInput.value);
        const drugFreq = (drugFreqInput.value);
        const drugDays = (drugDaysInput.value);
    
        if (drugGenName && drugDose && drugFreq && drugDays) {
            totalPrescription = totalPrescription + ' ' + drugGenName + ' ' + drugDose + ' ' + drugFreq + ' ' + drugDays + ' ' +'\n' ;
            totalPrescriptionInput.value = totalPrescription;
         } 
         
    }

    React.useEffect(() => {
        const drugDoseInput = document.getElementById("drugDose");
        const drugGenNameInput = document.getElementById("drugGenName");
        const drugFreqInput = document.getElementById("freq");
        const drugDaysInput = document.getElementById("days");
        const button = document.getElementById("add");
        if (drugGenNameInput && drugDoseInput && drugFreqInput && drugDaysInput && button) {
            button.addEventListener("click", prescriptionNote);
        } 

        return () => {
            
            if (drugGenNameInput && drugDoseInput && drugFreqInput && drugDaysInput && button) {
                button.removeEventListener("click", prescriptionNote);
            }
            
        };
    }, []);
    

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
                        <label htmlFor="drugGenName" className="mb-2 block text-sm font-medium">
                            Choose Drugs
                        </label>
                        <div className="relative">
                        <label className='mr-4'>Drug</label>
                        <Combobox value={selectedDrug} onChange={setSelectedDrug}>
                            
                            <Combobox.Input 
                                id = "drugGenName"
                                name = 'drugGenName'
                                onChange={(event) => setQuery(event.target.value)} 
                                className="border-gray-200 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus-within:ring-1 focus-within:ring-blue-500 max-w-sm mx-l"/>
                            <Combobox.Button className="inset-y-0 right-0  items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
      >
                            <Combobox.Options
                                className='focus-within:ring-1 focus-within:ring-blue-500 max-w-sm'
                            >
                                {filteredDrug.map((drug) => (
                                <Combobox.Option 
                                    key={drug.drug_id} 
                                    value= {`${drug.drug_name_generic} ${drug.drug_form}`}
                                    className="mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 sm:text-sm focus-within:ring-1 focus-within:ring-blue-500">
                            
                                        {drug.drug_name_generic} {drug.drug_form}
                                </Combobox.Option>
                                ))}
                            </Combobox.Options>
                            </Transition>
                        </Combobox>
                        <label className="mb-2 text-sm font-medium relative pl-4">Dose</label>
                        <input
                            id='drugDose'
                            name='drugDose'
                            className='relative rounded-md border-gray-200 pl-4 ml-4' 
                            style={{ width: '200px' }}
                        />
                        <label className="mb-2 text-sm font-medium relative pl-4">Frequency</label>
                        <input
                            id='freq'
                            name='freq'
                            className='relative rounded-md border-gray-200 pl-4 ml-4'
                            style={{ width: '100px' }}                            
                        />
                        <label className="mb-2 text-sm font-medium relative pl-4">Days</label>
                        <input
                            id='days'
                            name='days'
                            className='rounded-md border-gray-200 pl-4 ml-4'
                            style={{ width: '50px' }}
                        />
                        <button 
                            id = "add"
                            className="h-10 items-center rounded-lg bg-green-200 px-4 ml-4 text-sm font-medium text-gray-600 transition-colors hover:bg-green-400"
                            type='button'
                        >
                            Add
                        </button>
                        </div>
                        <div>
                            <label className='flex mt-4'>
                                Prescription: 
                            </label>
                            <textarea 
                                id='prescribed_med' 
                                name='prescribed_med' 
                                className='peer block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500' 
                                defaultValue = {totalPrescription}
                                rows={5}
                            />
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