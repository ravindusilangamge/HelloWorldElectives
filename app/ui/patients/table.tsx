import { UpdatePatient, DeletePatient, ViewPatient } from '@/app/ui/patients/buttons';
//import InvoiceStatus from '@/app/ui/invoices/status';
import { fetchPatients } from '@/app/lib/data';
//import { formatDateToLocal } from '@/app/lib/utils';

function calculateAge(birthDate: Date | null): { years: number | null; months: number | null } {
  if (!birthDate) {
    return { years: null, months: null };
  }

  const today = new Date();
  const yearsDiff = today.getFullYear() - birthDate.getFullYear();
  const monthsDiff = today.getMonth() - birthDate.getMonth();
  
  let years = yearsDiff;
  let months = monthsDiff;

  // Adjust years and months if necessary
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}


export default async function PatientsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const patients = await fetchPatients(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-blue-400 p-2 md:pt-0">
          <div className="md:hidden">
            {patients?.map((patient) => (
              <div
                key={patient.p_id}
                className="mb-2 w-full rounded-md bg-green-100 p-4"
              >
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className="text-xl font-medium">
                        {patient.name}
                      </p>
                    </div>
                    <div>
                    {patient.birthdate ? (
                    <>
                      {calculateAge(new Date(patient.birthdate)).years} years {calculateAge(new Date(patient.birthdate)).months} months
                    </>
                    ) : null}
                    </div>
                     <p>
                     {patient.gender === 'male' ? 'Male' : patient.gender === 'female' ? 'Female' : patient.gender}
                    </p>
                  </div>
                </div>
                <div className=" w-full items-center justify-between pt-4">
                  <div>
                    <p>{patient.phonenumber}</p>
                    <p className=''> {patient.address}</p>
                  </div>
                  <div className="flex justify-center gap-2">
                    <ViewPatient id = {patient.p_id}/>
                    <UpdatePatient id={patient.p_id} />
                    <DeletePatient id={patient.p_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-white text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Patient ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Age
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Gender
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone number
                </th>
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th> */}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {patients?.map((patient) => (
                <tr
                  key={patient.p_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{patient.p_id}</p>
                    </div>
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {patient.name}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                  {patient.birthdate ? (
                      <>
                        {calculateAge(new Date(patient.birthdate)).years} Years {calculateAge(new Date(patient.birthdate)).months} M
                      </>
                    ) : null}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {patient.gender === 'male' ? 'Male' : patient.gender === 'female' ? 'Female' : patient.gender}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {patient.phonenumber}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {patient.address}
                  </td> */}
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewPatient id = {patient.p_id}/>
                      <UpdatePatient id={patient.p_id} />
                      <DeletePatient id={patient.p_id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


