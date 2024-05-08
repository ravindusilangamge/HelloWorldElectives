// Import statements
import { lusitana } from '@/app/ui/fonts';
import { string } from 'zod';
import { PatientsTableType } from '@/app/lib/definitions';
import { patchFetch } from 'next/dist/server/app-render/entry-base';

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
        value6 = {patient.pmhx}
        value7 = {patient.dm}
        value8 = {patient.htn}
        value9 = {patient.dl}
        value10 = {patient.ba}
        food = {patient.food}
        drugs = {patient.drugs}
        plaster = {patient.plaster}
        allergy = {patient.allergy_det}
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
  value6,
  value7,
  value8,
  value9,
  value10,
  food,
  drugs,
  plaster,
  allergy,
  type,
}: {
  value: string;
  value2: string;
  value3: string | null; // Adjust type to accept string or null
  value4: string;
  value5: string;
  value6: string;
  value7: boolean;
  value8: boolean;
  value9: boolean;
  value10: boolean;
  food: boolean;
  drugs: boolean;
  plaster: boolean;
  allergy: string;
  type: 'p_id' | 'name' | 'age' | 'gender' | 'address';
}) {
  return (
    <div className='flex '>
      <div className=''>
      <div className="rounded-xl bg-rose-400 p-2 shadow-sm pb-4">
        <div className="flex p-4">
          <h3 className="ml-2 text-xl font-medium text-white">{value2}</h3>
        </div>

        <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium mb-1`}>
          ID: {value}
        </p>
        
        <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium mt-1 mb-1`}>
          Age: {value3 !== null ? value3 : 'Unknown'}
        </p>
        <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium mt-1 mb-1`}>
          {value4 === 'male' ? 'Male' : value4 === 'female' ? 'Female' : value4}
        </p>
        <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-1 text-left text-md font-medium mt-1`}>
          Address: {value5}
        </p>
      </div>

      <div className="rounded-xl bg-teal-300 p-2 shadow-sm mt-4">
        <fieldset className='flex'>
          <legend className="ml-2 text-md font-medium flex p-4">Allergy</legend>
            <div className="flex gap-2 rounded-md mb-2 border border-gray-200 bg-white px-[14px] py-3">
                  {food && (
                    <div className="flex items-center">
                      <label htmlFor="dm" className=" flex cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-gray-600">Food</label>
                    </div>
                  )}
                  {drugs && (
                    <div className="flex items-center">
                      <label htmlFor="htn" className=" flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-gray-600">Drugs</label>
                    </div>
                  )}
                  {plaster && (
                    <div className="flex items-center">
                      <label htmlFor="dl" className=" flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-gray-600">Plater</label>
                    </div>
                  )}
                  {!food && !drugs && !plaster &&  (
                      <div className="flex items-center">
                        <label htmlFor="none" className=" flex cursor-pointer items-center gap-1.5 rounded-full bg-grey-100 px-3 py-1.5 text-sm font-medium text-gray-600">No food, drugs or plaster allergy.</label>
                      </div>
                  )
                  }
            </div>
        </fieldset>
        <div className="flex rounded-md mb-4 border border-gray-200 bg-white px-[14px] py-3"> 
          <div className="flex items-center">
              {allergy ? (
                <label className='text-sm px-3 py-1.5'>{allergy}</label>
              ) : (
                <label className='text-sm px-3 py-1.5'>No hx of allergy</label>
              )}
          </div>
        </div>
      </div>
      </div>

      <div className="flex w-full rounded-xl bg-indigo-300 p-4 ml-4 shadow-sm">
        <fieldset className='flex w-full'>
          <legend className="ml-2 text-md font-medium flex p-4">Past Medical History</legend>
          {!value7 || !value8 || !value9 || !value10 || (
            <div className="flex gap-2 rounded-md mb-2 border border-gray-200 bg-white px-[14px] py-3 mr-4">
                  {value7 && (
                    <div className="flex items-center">
                      <label htmlFor="dm" className=" flex cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-gray-600">DM</label>
                    </div>
                  )}
                  {value8 && (
                    <div className="flex items-center">
                      <label htmlFor="htn" className=" flex cursor-pointer items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-medium text-gray-600">HTN</label>
                    </div>
                  )}
                  {value9 && (
                    <div className="flex items-center">
                      <label htmlFor="dl" className=" flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-gray-600">DL</label>
                    </div>
                  )}
                  {value10 && (
                    <div className="flex items-center">
                      <label htmlFor="ba" className=" flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-gray-600">BA</label>
                    </div>
                  )}
                  {/* {!value7 && !value8 && !value9 && !value10 && (
                      <div className="flex items-center">
                        <label htmlFor="none" className=" flex cursor-pointer items-center gap-1.5 rounded-full bg-grey-100 px-3 py-1.5 text-xs font-medium text-gray-600">No Diabetes Mellitus, Hypertension, Dislipidemia or Bronchial Asthma</label>
                      </div>
                  )
                  } */}
            </div>
          )}
          <div className="flex w-full justify-center rounded-md mb-2 border border-gray-200 bg-white px-[14px] py-3"> 
            <div className='flex items-center'>
              {value6 ? (
                <label className='text-sm'>{value6}</label>
              ) : (
                <label className='text-sm'>No significant Past Medical History</label>
              )}
            </div>
          </div>
        </fieldset>
      </div>
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