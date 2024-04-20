import { fetchPatientById, fetchVisitsById } from '@/app/lib/data';
import { PatientsTableType, VisitsTable } from '@/app/lib/definitions';
import { formatDateToLocal,  } from '@/app/lib/utils';

export default async function VisitTable({patient1}: {patient1: VisitsTable[];}){
    //const patients = await fetchVisitsById(patient1);
    return(
        <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {patient1?.map((visit) => (
                <div
                  key={visit.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{formatDateToLocal(visit.date)}</p>
                      </div>
                    </div>
                    
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                    <p className="text-sm text-gray-500">{visit.pcompl}</p>
                      <p className="text-sm font-medium">{visit.hpc}</p>
                      <p className="text-sm text-gray-500">{visit.pmhx}</p>
                      <p className="text-sm text-gray-500">{visit.allergy}</p>
                      <p className="text-sm text-gray-500">{visit.examination}</p>
                      <p className="text-sm text-gray-500">{visit.investigations_sofar}</p>
                      <p className="text-sm text-gray-500">{visit.prescribed_med}</p>
                      <p className="text-sm text-gray-500">{visit.investigations_ordered}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    PC
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    HPC
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    PMHx
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Allergy
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Examination
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Investigations Done
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Treatment
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Investigations ordered
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {patient1?.map((visit) => (
                  <tr
                    key={visit.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{formatDateToLocal(visit.date)}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{visit.pcompl}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {visit.hpc}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {(visit.pmhx)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {(visit.allergy)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {(visit.examination)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {(visit.investigations_sofar)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {(visit.prescribed_med)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {(visit.investigations_ordered)}
                    </td>
                    {/* <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateInvoice id={invoice.id} />
                        <DeleteInvoice id={invoice.id} />
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }