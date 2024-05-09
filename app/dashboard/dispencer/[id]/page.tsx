import { fetchDrugsforForm, fetchPatientsByVisit, fetchPrescriptionsByVisitID, fetchStocks, fetchVisitForPresById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/dispencer/newform";
import Form1 from "@/app/ui/dispencer/bottom";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    let totalValue= 0;
    const drugStocks = await fetchStocks();
    const drugDetails = await fetchDrugsforForm();
    const todayPatients = await fetchPatientsByVisit();
    const visitDetails = await fetchVisitForPresById(id);
    const prescriptionsByVisit = await fetchPrescriptionsByVisitID(id);
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
        {visitDetails.prescription.map((item, index) => (
                <div key={index}>
                    <Form drug = {item[0]} dose = {parseInt(item[1])} totalValue = {totalValue} freq = {parseInt(item[2])} days = {parseInt(item[3])} drugdetails = {drugDetails} drugstocks ={drugStocks} visit_id={id}/>
                </div>
            ))}
      </div>
      <div>
            <Form1 drugsDispensed = {prescriptionsByVisit} id = {id} totalValue = {totalValue}/>
      </div>
    </div>
    );
  }