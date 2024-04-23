// Import statements
import { lusitana } from '@/app/ui/fonts';
import { string } from 'zod';
import { PatientsTableType } from '@/app/lib/definitions';

// OverviewCard Component
export default async function OverviewCard({
  patient,
}: {
  patient: PatientsTableType;
}) {
  // console.log('This is the birthdate:', patient.birthdate);
  return (
    <>
      <Card
        value={patient.p_id}
        value2={patient.name}
        value3={patient.birthdate ? calculateAge(new Date(patient.birthdate)) : null}
        value4={patient.gender}
        value5={patient.address}
        type="p_id"
      />
    </>
  );
}

// Card Component
export function Card({
  value,
  value2,
  value3,
  value4,
  value5,
  type,
}: {
  value: string;
  value2: string;
  value3: string | null; // Adjust type to accept string or null
  value4: string;
  value5: string;
  type: 'p_id' | 'name' | 'age' | 'gender' | 'address';
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-xl font-medium">{value2}</h3>
      </div>

      <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium`}>
        ID: {value}
      </p>
      {/* Display age even if birthdate is null */}
      <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium`}>
        Age: {value3 !== null ? value3 : 'Unknown'}
      </p>
      <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium`}>
        {value4}
      </p>
      <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium`}>
        Address: {value5}
      </p>
    </div>
  );
}

// calculateAge Function
function calculateAge(birthDate: Date): string {
  const today = new Date();
  const yearsDiff = today.getFullYear() - birthDate.getFullYear();
  const monthsDiff = today.getMonth() - birthDate.getMonth();
  const ageString = `${yearsDiff} years ${monthsDiff} months`; // Construct the age string directly

  return ageString;
}