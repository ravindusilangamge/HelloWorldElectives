
import { fetchDrugsforForm, fetchPatientsByVisit, fetchPrescriptionsByDate, fetchStocks } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
//import Form  from "@/app/ui/dispencer/dispenceform";
import Table  from "@/app/ui/dispencer/table";
//import DropDown from "@/app/ui/dispencer/selectprescription";

export default async function page(){
    const prescriptionsToday = await fetchPrescriptionsByDate();
    const drugStocks = await fetchStocks();
    const drugDetails = await fetchDrugsforForm();
    const todayPatients = await fetchPatientsByVisit();
    
    return (
        <div>
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Drug Dispenser</h1>
            </div>
            {/* <div>
                <Form visit = {prescriptionsToday} stocks = {drugStocks} drugs = {drugDetails} patient = {todayPatients}/>
            </div> */}
            <div>
                <Table/>
            </div>
        </div>
    );
}
