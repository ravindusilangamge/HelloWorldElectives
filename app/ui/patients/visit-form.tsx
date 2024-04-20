import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { PatientsTableType } from '@/app/lib/definitions';
import { addVisit } from '@/app/lib/actions';
import { fetchPatientById } from '@/app/lib/data';
import { any } from 'zod';

export default function Form(p_id: {p_id: string}, patient_details: {patient_details: PatientsTableType[]}) {
    const patient_id = p_id.p_id;
    const pat_details = patient_details;
    console.log(patient_id);
    return(
        <form action={addVisit}>
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
                        defaultValue={patient_id}
                        placeholder="Enter ID"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    </div>
                </div>
                <p>Age: {patient_id}</p>
            </div>
        </form>
    );
}