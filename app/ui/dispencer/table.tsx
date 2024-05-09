
import { ViewPrescription } from '@/app/ui/invoices/buttons';
import { fetchDrugsforForm, fetchPatientsByVisit, fetchPrescriptionsByDate, fetchVisitForPresById } from '@/app/lib/data';

export default async function InvoicesTable() {
  //const invoices = await fetchFilteredInvoices(query, currentPage);
  const prescriptionsToday = await fetchPrescriptionsByDate();
  const drugDetails = await fetchDrugsforForm();
    const todayPatients = await fetchPatientsByVisit();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {prescriptionsToday?.map((visits) => (
              <div
                key={visits.id}
                    className={`mb-2 w-full rounded-md p-4 ${visits.dispensed ?  'bg-white' : 'bg-red-100'}`}              
                >
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                  <p className="text-xl font-medium">
                        {todayPatients.find(test => test.p_id === visits.patient_id)?.name}
                    </p>
                    <p className="text-xl font-medium">
                      {visits.prescription}
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
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Prescription
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {prescriptionsToday?.map((visits) => (
                <tr
                  key={visits.id}
                  className={`w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg ${visits.dispensed ?  'bg-white' : 'bg-red-100'}`}
                >
                  <td className="whitespace-normal px-3 py-3">
                    {todayPatients.find(test => test.p_id === visits.patient_id)?.name}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {visits.prescription}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewPrescription id={visits.id} />
                      {/* <DeleteInvoice id={visits.id} /> */}
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
