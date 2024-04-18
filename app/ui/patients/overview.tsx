import { lusitana } from '@/app/ui/fonts';
import { fetchPatientById } from '@/app/lib/data';
import { string } from 'zod';
import { PatientsTableType } from '@/app/lib/definitions';

export default async function OverviewCard({
  patient,
}: {
  patient: PatientsTableType;
}) {
  const fetchPatientdetails = await fetchPatientById(patient.p_id);

  return(
    <>
    <Card 
      //title="ID" 
      value={(fetchPatientdetails).p_id }
      value2={fetchPatientdetails.name} 
      value3={fetchPatientdetails.age}
      value4={fetchPatientdetails.gender}
      value5={fetchPatientdetails.address}
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
          truncate rounded-xl bg-white px-4 py-1 text-left text-xl`}
      >
        ID: {value} 
      </p>
      <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-1 text-left text-xl`}
        >
          Age: {value3}
        </p>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-1 text-left text-xl`}
        >
          Gender: {value4} 
        </p>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-1 text-left text-xl`}
        >
          Address: {value5} 
        </p>
    </div>
    
  );
}