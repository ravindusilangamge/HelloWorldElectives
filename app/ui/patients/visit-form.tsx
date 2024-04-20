import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { PatientsTableType } from '@/app/lib/definitions';
import { addVisit } from '@/app/lib/actions';
import { fetchPatientById } from '@/app/lib/data';

export default function Form(pat_id: {p_id: string}) {
    const patient_id = pat_id.p_id;
    const pat_details = fetchPatientById(patient_id);
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
                <p>Age: {}</p>
            </div>
        </form>
    );
}