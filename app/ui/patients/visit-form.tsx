'use client'
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { PatientsTableType, DrugsTableType, DrugStocksTable } from '@/app/lib/definitions';
import { addVisit } from '@/app/lib/actions';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

let prescriptiontest: any[] = [];
let prescriptionTest1: any[] = [];


export default function Form( values: {patient_id: string, patient_details: PatientsTableType[], drugs: DrugsTableType[], stocks: DrugStocksTable[]}) {
    const {patient_details, patient_id, drugs, stocks} = values;
    
    
    console.log("these are patient details," ,{patient_details});
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    
    const [selectedDrug, setSelectedDrug] = useState('');
    const [query, setQuery] = useState('');
    //const [prescriptiontest, setPrescriptionTest] = useState<any[]>([]);

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
        const presc = document.getElementById("prescription") as HTMLInputElement;
    
        const drugGenName = (drugGenNameInput.value);
        const drugDose = (drugDoseInput.value);
        const drugFreq = (drugFreqInput.value);
        const drugDays = (drugDaysInput.value);
        
    
        if (drugGenName && drugDose && drugFreq && drugDays) {
            
            var prescriptionArray = [drugGenName, drugDose, drugFreq, drugDays];
            var prescriptionArray1 = [drugs.find(test => test.drug_id === drugGenName)?.drug_name_generic,drugs.find(test => test.drug_id === drugGenName)?.drug_form, drugDose, drugFreq, drugDays];
            
            prescriptionTest1.push(prescriptionArray1);
            //console.log('this is prescriptiontest', prescriptiontest);
            var prescriptionString = prescriptionTest1.map(arr => arr.join(' ')).join('\n');
    
            totalPrescriptionInput.value = prescriptionString;
            prescriptiontest.push(prescriptionArray);
            presc.value = JSON.stringify(prescriptiontest);
            
            //console.log('at the form' , prescriptiontest);
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

    const [selectedInvestigations, setSelectedInvestigations] = useState<string[]>([]);

    const handleInvestigationChange = (value: string) => {
        let updatedInvestigations: string[];
    
        if (selectedInvestigations.includes(value)) {
            updatedInvestigations = selectedInvestigations.filter(item => item !== value);
        } else {
            updatedInvestigations = [...selectedInvestigations, value];
        }
    
        setSelectedInvestigations(updatedInvestigations);
    
        const selectedInvestigationsString = updatedInvestigations.join(', ');
        const investigationsInput = document.getElementById("investigations_ordered") as HTMLInputElement;
        investigationsInput.value = selectedInvestigationsString;
    };

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle the checkbox state
        // If FBC checkbox is unchecked, clear FBC test results
        if (!isChecked) {
            const updatedInputs = { ...inputs, wbc: '', rbc: '', hb: '', plt: '', hct: '' };
            const entriesWithoutFBC = entries.filter(entry => !entry.startsWith('WBC: ') && !entry.startsWith('RBC: ') && !entry.startsWith('HB:') && !entry.startsWith('PLT:') && !entry.startsWith('HCT:'));
            const formatted = entriesWithoutFBC.join(' ');

            setInputs(updatedInputs);
            setFormattedInvestigations(formatted);
        }
      };

    const [isCheckedcrp, setIsCheckedCRP] = useState(false);
    const handleCheckboxChangeCRP = () => {
        setIsCheckedCRP(!isCheckedcrp); // Toggle the checkbox state
        if (!isCheckedcrp) {
            const updatedInputs = { ...inputs, crp: ''};
            const entriesWithoutCRP = entries.filter(entry => !entry.startsWith('CRP: '));
            const formatted = entriesWithoutCRP.join(' ');

            setInputs(updatedInputs);
            setFormattedInvestigations(formatted);
        }
    };

    const [inputs, setInputs] = useState({
        wbc: '',
        rbc: '',
        hb: '',
        plt: '',
        hct: '',
        crp: ''
    });

    const entries: string[] = [];
    
    const [formattedInvestigations, setFormattedInvestigations] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedInputs = { ...inputs, [name]: value };
        
            // Create an array to store labels and values
        //const entries = [];
        
        // Conditionally add labels and values to the array
        if (isChecked) {
            const fbcEntries: any[] = [];
            if (updatedInputs.wbc.trim() !== '') {
                entries.push(`WBC: ${updatedInputs.wbc}`);
            }
            if (updatedInputs.rbc.trim() !== '') {
                entries.push(`RBC: ${updatedInputs.rbc}`);
            }
            if (updatedInputs.hb.trim() !== '') {
                entries.push(`HB: ${updatedInputs.hb}`);
            }
            if (updatedInputs.plt.trim() !== '') {
                entries.push(`PLT: ${updatedInputs.plt}`);
            }
            if (updatedInputs.hct.trim() !== '') {
                entries.push(`HCT: ${updatedInputs.hct}`);
            }
            if (fbcEntries.length > 0) {
                entries.push(fbcEntries.join(' '));
            }
        }

        if (isCheckedcrp && value.trim() !== '') {
            entries.push(`CRP: ${updatedInputs.crp}`);
        }
        
        // Concatenate the array elements into a string
        const formatted = entries.join(' ');

        setInputs(updatedInputs);
        setFormattedInvestigations(formatted);
    };
    

    return(
    <div>
        <form action={addVisit}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6 mt-4"> 
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
                                required
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
                        <label htmlFor="fbc" className="mb-2 mt-2 pr-2 relative text-sm font-medium">
                            <input
                            id='fbc'
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="form-checkbox rounded-md h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2">FBC</span>
                        </label>
                        <label htmlFor="crp" className="mb-2 mt-2 pr-2 relative text-sm font-medium">
                            <input
                            id='crp'
                            type="checkbox"
                            checked={isCheckedcrp}
                            onChange={handleCheckboxChangeCRP}
                            className="form-checkbox rounded-md h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2">CRP</span>
                        </label>

                        {isChecked && ( // Render text input fields only when the checkbox is checked
                            <div>
                            <label htmlFor="text-input" className="block mt-4">
                                FBC:
                            </label>
                            <label className="inline-flex items-center mb-2 pr-2 pl-2">WBC:</label>
                            <input
                                id="wbc"
                                name="wbc"
                                type="text"
                                value={inputs.wbc}
                                onChange={handleInputChange}
                                className="relative rounded-md mt-2 border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter WBC..."
                            />
                            <label className="inline-flex items-center mb-2 pr-2 pl-2">RBC:</label>
                            <input
                                id="rbc"
                                name="rbc"
                                type="text"
                                value={inputs.rbc}
                                onChange={handleInputChange}
                                className="relative rounded-md mt-2 border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter RBC..."
                            />
                            <label className="inline-flex items-center mb-2 pr-2 pl-2">HB:</label>
                            <input
                                id="hb"
                                name="hb"
                                type="text"
                                value={inputs.hb}
                                onChange={handleInputChange}
                                className="relative rounded-md mt-2 border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter Heamoglobin..."
                            />
                            <label className="inline-flex items-center mb-2 pr-2 pl-2">PLT:</label>
                            <input
                                id="plt"
                                name="plt"
                                type="text"
                                value={inputs.plt}
                                onChange={handleInputChange}
                                className="relative rounded-md mt-2 border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter PLT..."
                            />
                            <label className="inline-flex items-center mb-2 pr-2 pl-2">HCT:</label>
                            <input
                                id="hct"
                                name="hct"
                                type="text"
                                value={inputs.hct}
                                onChange={handleInputChange}
                                className="relative rounded-md mt-2 border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter HCT..."
                            />
                            </div>
                        )}
                        {isCheckedcrp && ( // Render text input fields only when the checkbox is checked
                            <div>
                            <label htmlFor="crp" className="relative mt-4 pr-2">
                                CRP:
                            </label>
                            <input
                                id="crp"
                                name="crp"
                                type="text"
                                value={inputs.crp}
                                onChange={handleInputChange}
                                className="relative pr-2 pl-2 mt-2 rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter CRP..."
                            />
                            </div>
                        )}
                        <input
                        id="investigations_sofar"
                        name="investigations_sofar"
                        type="text"
                        value={formattedInvestigations}
                        //value={`${textInvest}`}
                        readOnly
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 mt-4"
                    />
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
                                    value= {`${drug.drug_id}`}
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
                                rows={5}
                            />
                        </div>
                    </div>
                    
                    <input
                        id="prescription"
                        name="prescription"
                        type="hidden"
                        //value={JSON.stringify(prescriptiontest)}
                    />



                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 mt-2 block text-sm font-medium">
                            Investigations ordered.
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div>
                            <label className="inline-flex items-center mb-2 pr-2">
                                <input
                                    type="checkbox"
                                    value="FBC"
                                    checked={selectedInvestigations.includes("FBC")}
                                    onChange={() => handleInvestigationChange("FBC")}
                                    className="form-checkbox rounded-md h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">FBC</span> 
                                </label>

                                <label className="inline-flex items-center mb-2 pr-2">
                                <input
                                    type="checkbox"
                                    value="CRP"
                                    checked={selectedInvestigations.includes("CRP")}
                                    onChange={() => handleInvestigationChange("CRP")}
                                    className="form-checkbox rounded-md h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">CRP</span> 
                                </label>

                                <label className="inline-flex items-center mb-2 pr-2">
                                <input
                                    type="checkbox"
                                    value="AST"
                                    checked={selectedInvestigations.includes("AST")}
                                    onChange={() => handleInvestigationChange("AST")}
                                    className="form-checkbox rounded-md h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">AST</span> 
                                </label>

                                <label className="inline-flex items-center mb-2 pr-2">
                                <input
                                    type="checkbox"
                                    value="ALT"
                                    checked={selectedInvestigations.includes("ALT")}
                                    onChange={() => handleInvestigationChange("ALT")}
                                    className="form-checkbox rounded-md h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">ALT</span> 
                                </label>

                                <label className="inline-flex items-center mb-2 pr-2">
                                <input
                                    type="checkbox"
                                    value="FBS"
                                    checked={selectedInvestigations.includes("FBS")}
                                    onChange={() => handleInvestigationChange("FBS")}
                                    className="form-checkbox rounded-md h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">FBS</span> 
                                </label>
                                <input
                                    id = "investigations_ordered"
                                    name = "investigations_ordered"
                                    type = "string"
                                    placeholder="Investigations..."
                                    //defaultValue={'helllo'}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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