import { ViewPrescription, ViewBill } from '@/app/ui/invoices/buttons';
import { fetchDrugsforForm, fetchPatientsByVisit, fetchPrescriptionsByDate, fetchVisitForPresById } from '@/app/lib/data';
import InvoiceStatus from '@/app/ui/dispencer/status';
import React from 'react';

export default async function InvoicesTable() {
  //const invoices = await fetchFilteredInvoices(query, currentPage);
  const prescriptionsToday = await fetchPrescriptionsByDate();
  const drugDetails = await fetchDrugsforForm();
  const todayPatients = await fetchPatientsByVisit();

  const validPrescriptions = prescriptionsToday.filter((visit) => visit.prescription !== null);

  const sortedPrescriptions = validPrescriptions.sort((a, b) => {
    // Compare by dispensed (false should come before true)
    if (a.dispensed !== b.dispensed) {
      return a.dispensed ? 1 : -1;
    }

    // If dispensed values are the same, compare by date
    const dateA = new Date(a.datereal);
    const dateB = new Date(b.datereal);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-blue-400 p-2 md:pt-0">
          <div className="md:hidden">
            {sortedPrescriptions.map((visits, index) => (
              <div
                key={index}
                className={`mb-2 w-full rounded-md p-4 ${visits.dispensed ? 'bg-emerald-200' : 'bg-red-100'}`}
              >
                <div className="flex w-full items-center justify-between pt-2">
                  <div>
                    <p className="text-xl font-medium justify-between items-center mb-2">
                      <span className='inline-flex items-center rounded-lg px-2 py-1 text-xs text-white bg-blue-400 font-bold'>{index + 1}</span>
                      <span className='pl-2 px-2 py-1 '>{' '}{todayPatients.find(test => test.p_id === visits.patient_id)?.name}</span>
                    </p>
                    <p className="text-xl font-small">
                      {visits.prescription?.map((test1, subIndex) => (
                        <React.Fragment key={subIndex}>{drugDetails.find(test => test.drug_id === test1[0])?.drug_name_generic}<br /></React.Fragment>
                      ))}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <ViewPrescription id={visits.id} />
                    {/* <DeleteInvoice id={visits.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-white text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">#</th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Prescription
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-center">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedPrescriptions.map((visits, index) => (
                <tr
                  key={index}
                  className={`w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg ${visits.dispensed ? 'bg-emerald-100' : 'bg-red-100'}`}
                >
                  <td className="whitespace-normal px-3 py-3 w-12 text-center">
                    <span className='inline-flex items-center rounded-lg px-2 py-1 text-xs text-white bg-blue-400 font-bold'>{index + 1}</span>
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {todayPatients.find(test => test.p_id === visits.patient_id)?.name}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {visits.prescription?.map((test1, subIndex) => (
                      <p key={subIndex}>{drugDetails.find(test => test.drug_id === test1[0])?.drug_name_generic}{' '}</p>
                    ))}
                  </td>
                  <td className="whitespace-normal px-3 py-3 text-center">
                    <InvoiceStatus status={visits.dispensed} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {visits.dispensed ? (
                        <ViewBill id={visits.id} />
                      ) : (
                        <ViewPrescription id={visits.id} />
                      )}
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
