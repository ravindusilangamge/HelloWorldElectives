import { lusitana } from '@/app/ui/fonts';
import { fetchPatientById } from '@/app/lib/data';
import { string } from 'zod';
import { PatientsTableType } from '@/app/lib/definitions';

export default async function OverviewCard({
  patient,
}: {
  patient: PatientsTableType;
}) {
  //const fetchPatientdetails = await fetchPatientById(patient.p_id);

  return(
    <>
    <Card 
      //title="ID" 
      value={patient.p_id }
      value2={patient.name} 
      value3={patient.age}
      value4={patient.gender}
      value5={patient.address}
      type="p_id" 
    />
    {/* <Card title="Name" value={(fetchPatientdetails).name} type="name" />
    <Card title="Age" value={(fetchPatientdetails).age} type="age" />
    <Card title="Gender" value={(fetchPatientdetails).gender} type="gender" />
    <Card title="Address" value={(fetchPatientdetails).address} type="address" /> */}
    </>
  );
  
}

export function Card({
  //title,
  value,
  value2,
  value3,
  value4,
  value5,
  type,
}: {
  //title: string;
  value: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  type: 'p_id' | 'name' | 'age' | 'gender' | 'address';
}) {
  //const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {/* {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null} */}
          <h3 className="ml-2 text-xl font-medium">{value2}</h3>
        </div>
      
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium`}
      >
        ID: {value} 
      </p>
      <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium`}
        >
          Age: {value3}
        </p>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium`}
        >
        {value4} 
        </p>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium`}
        >
          Address: {value5} 
        </p>
    </div>
    
  );
}