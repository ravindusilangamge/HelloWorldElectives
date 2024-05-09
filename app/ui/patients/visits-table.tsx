import { fetchPatientById, fetchVisitsById } from '@/app/lib/data';
import { PatientsTableType, VisitsTable } from '@/app/lib/definitions';
import { formatDateToLocal,  } from '@/app/lib/utils';
import React from 'react';

export default async function VisitTable({patient1}: {patient1: VisitsTable[];}){
    //const patients = await fetchVisitsById(patient1);
    return(
      <div className="mt-1 overflow-x-auto">
        <div className="mt-2 flow-root">
        <div className="inline-block min-w-full align-middle">
        
          <div className="rounded-lg bg-teal-400 p-2 md:pt-0">
          {patient1 && patient1.length > 0 ? (
            <React.Fragment>
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
                      <p className="text-sm text-gray-500">{visit.examination}</p>
                      <p className="text-sm text-gray-500">{visit.investigations_sofar}</p>
                      <p className="text-sm text-gray-500">{visit.prescribed_med}</p>
                      <p className="text-sm text-gray-500">{visit.prescription}</p>
                      <p className="text-sm text-gray-500">{visit.investigations_ordered}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm text-white font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6 max-w-xs">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    PC
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    HPC
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    Examination
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    Investigations Done
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    Treatment
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    Prescription
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
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
                    <td className="whitespace-normal py-3 pl-6 pr-3 max-w-xs">
                      <div className="flex items-center gap-3">
                        <p>{formatDateToLocal(visit.date)}</p>
                      </div>
                    </td>
                    <td className="whitespace-normal py-3 pl-6 pr-3 max-w-xs">
                      <div className="flex items-center gap-3">
                        <p>{visit.pcompl}</p>
                      </div>
                    </td>
                    <td className="whitespace-normal px-3 py-3 max-w-xs">
                      {visit.hpc}
                    </td>
                    <td className="whitespace-normal px-3 py-3 max-w-xs">
                      {(visit.examination)}
                    </td>
                    <td className="whitespace-normal px-3 py-3 max-w-xs">
                      {(visit.investigations_sofar)}
                    </td>
                    <td className="whitespace-normal px-3 py-3 max-w-xs">
                      {(visit.prescribed_med)}
                    </td>
                    <td className="whitespace-normal px-3 py-3 max-w-xs">
                      {(visit.prescription)}
                    </td>
                    <td className="whitespace-normal px-3 py-3 max-w-xs">
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
            </React.Fragment>
          ) : (
            <div className="text-center text-gray-500">
              No data available.
            </div>
            )}
          </div>
        </div>
      </div>
      </div>
    );
  }