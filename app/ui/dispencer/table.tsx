
import { ViewPrescription } from '@/app/ui/invoices/buttons';
import { fetchDrugsforForm, fetchPatientsByVisit, fetchPrescriptionsByDate, fetchVisitForPresById } from '@/app/lib/data';

export default async function InvoicesTable() {
  //const invoices = await fetchFilteredInvoices(query, currentPage);
  const prescriptionsToday = await fetchPrescriptionsByDate();
  const drugDetails = await fetchDrugsforForm();
  const todayPatients = await fetchPatientsByVisit();

  const sortedPrescriptions = prescriptionsToday.sort((a, b) => {
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
        <div className="rounded-lg bg-violet-400 p-2 md:pt-0">
          <div className="md:hidden">
            {sortedPrescriptions.map((visits, index) => (
              <div
                key={index}
                    className={`mb-2 w-full rounded-md p-4 ${visits.dispensed ?  'bg-emerald-200' : 'bg-red-100'}`}              
                >
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>
                      # {index + 1}
                    </p>
                    <p className="text-xl font-medium">
                        {todayPatients.find(test => test.p_id === visits.patient_id)?.name}
                    </p>
                    <p className="text-xl font-small">
                      {visits.prescription?.map((test1) => (
                        <>{drugDetails.find(test => test.drug_id === test1[0])?.drug_name_generic}<br></br></>
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
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedPrescriptions.map((visits, index) => (
                <tr
                  key={index}
                  className={`w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg ${visits.dispensed ?  'bg-emerald-200' : 'bg-red-100'}`}
                >
                  <td className="whitespace-normal px-3 py-3 w-12 text-center">
                    {index + 1}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {todayPatients.find(test => test.p_id === visits.patient_id)?.name}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {/* {drugDetails.find(test => test.drug_id === visits.prescription[0][0])?.drug_name_generic} */}
                    {visits.prescription?.map((test1) => (
                      <p>{drugDetails.find(test => test.drug_id === test1[0])?.drug_name_generic}{' '}</p>
                    ))}
                    
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
