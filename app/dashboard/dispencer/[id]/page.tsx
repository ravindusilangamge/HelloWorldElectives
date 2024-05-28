import { fetchDrugsforForm, fetchPatientsByVisit, fetchPrescriptionsByVisitID, fetchStocks, fetchVisitForPresById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/dispencer/newform2";
import Form1 from "@/app/ui/dispencer/bottom";
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const drugStocks = await fetchStocks();
    const drugDetails = await fetchDrugsforForm();
    const todayPatients = await fetchPatientsByVisit();
    const visitDetails = await fetchVisitForPresById(id);
  // const prescriptionsByVisit = await fetchPrescriptionsByVisitID(id);
    return (
    <div>
        <Breadcrumbs
        breadcrumbs={[
          { label: 'Drug dispenser', href: '/dashboard/dispencer' },
          {
            label: 'dispense drugs',
            href: `/dashboard/dispencer/${id}`,
            active: true,
          },
        ]}
      />
      <div>
        <fieldset>
            <div className="relative items-center">
                <label htmlFor="name" className=" items-center bg-grey-100 px-3 py-1.5 text-md mb-4 font-medium text-gray-800">
                    {todayPatients.find(test => test.p_id === visitDetails.patient_id)?.name}
                </label>
            </div>
        </fieldset>
        
        <Form id = {id} drugdetails = {drugDetails} drugstocks ={drugStocks} visit_id={id} visitdetails={visitDetails}/>
              
      </div>
    </div>
    );
  }