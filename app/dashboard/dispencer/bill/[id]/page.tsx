import { fetchPrescriptionsByVisitID, fetchPatientByVisitIDforBill, fetchStocks, fetchDrugsforForm } from "@/app/lib/data";
import Invoice from "@/app/ui/dispencer/invoice";
import React from 'react';




export default async function Page({ params }: { params: { id: string } }) {
    const prescriptionData = await fetchPrescriptionsByVisitID(params.id);
    const patientData = await fetchPatientByVisitIDforBill(params.id);
    const stockData = await fetchStocks();
    const drugData = await fetchDrugsforForm();

    return(
        <div>
            <Invoice id = {params.id} prescriptionData={prescriptionData} patientData={patientData} stockData={stockData} drugData={drugData}/>
        </div>
        

    );
}