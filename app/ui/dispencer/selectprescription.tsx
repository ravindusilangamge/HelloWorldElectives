'use client'

import { useState } from 'react';
import Link from 'next/link';
import { createInvoice, addDrugSale } from '@/app/lib/actions';
import { DrugStocksTable, DrugsTableType, PatientsTableType, VisitsTable } from '@/app/lib/definitions';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { Button } from '@/app/ui/button';

export default function Form({ visit, stocks, drugs, patient }: { visit: VisitsTable[], stocks: DrugStocksTable[], drugs: DrugsTableType[], patient: PatientsTableType[]}) {
  const [selectedPrescription, setSelectedPrescription] = useState<VisitsTable | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<DrugStocksTable | null>(null);
  const [totalPills, setTotalPills] = useState<number>(0);

  const handlePrescriptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedPrescription = visit.find(visit => visit.id === selectedId);
    setSelectedPrescription(selectedPrescription || null);
    setTotalPills(0);
  };

  const handleDrugSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const drugId = event.target.value;
    const selectedDrug = stocks.find(stock => stock.stock_id === drugId);
    setSelectedDrug(selectedDrug || null);

    if (selectedPrescription && selectedDrug) {
      const selectedPrescriptionDrug = selectedPrescription.prescription.find(drug => drug[0] === selectedDrug.drug_id);
      if (selectedPrescriptionDrug) {
        const dose = parseInt(selectedPrescriptionDrug[1]);
        const frequency = parseInt(selectedPrescriptionDrug[2]);
        const days = parseInt(selectedPrescriptionDrug[3]);
        const totalPills = (dose * frequency * days) / selectedDrug.drug_dose;
        setTotalPills(totalPills);
      }
    }
  };

  const handleDispense = async () => {
    if (selectedPrescription && selectedDrug) {
      
      const saleRecord = {
        visit_id: selectedPrescription.id,
        stock_id: selectedDrug.stock_id,
        quantity: totalPills,
        amount: totalPills * selectedDrug.sell_price, 
      };
      try {
        
        await addDrugSale(saleRecord);
        // Optionally, you can add logic to update stock quantities here
        console.log('Drug dispensed successfully');
        // Clear selected prescription and drug after successful dispense
        setSelectedPrescription(null);
        setSelectedDrug(null);
        setTotalPills(0);
      } catch (error) {
        console.error('Error dispensing drug:', error);
      }
    }
  };

  return (
    <form onSubmit={handleDispense}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="prescription" className="mb-2 block text-sm font-medium">
            Choose prescription
          </label>
          <div className="relative">
            <select
              id="prescription"
              name="prescription"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              onChange={handlePrescriptionSelect}
            >
              <option value="" disabled>
                Select prescription
              </option>
              {visit.map((prescription) => (
                <option key={prescription.id} value={prescription.id}>
                  {prescription.patient_id} {patient.find(test => test.p_id === prescription.patient_id)?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedPrescription && (
          <div>
            <h3 className="text-lg font-medium mb-2">Prescription Details</h3>
            <p>Patient ID: {selectedPrescription.patient_id} {patient.find(test => test.p_id === selectedPrescription.patient_id)?.name}</p>
            <p>Drugs Prescribed: </p>
            {selectedPrescription.prescription.map((drug, index) => (
              <div>
              <div key={index}>
                <p>Drug {index + 1}: {drugs.find(test => test.drug_id === drug[0])?.drug_name_generic} {drugs.find(test => test.drug_id === drug[0])?.drug_form} Dose: {drug[1]} Freq: {drug[2]} Days: {drug[3]}</p>
                <div className="relative">
                  <select
                    id="drug"
                    name="drug"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue=""
                    onChange={handleDrugSelect}
                  >
                    <option value="" disabled>
                      Select drug
                    </option>
                    {stocks
                      .filter(stock => stock.drug_id === drug[0])
                      .map((stock) => (
                        <option key={stock.stock_id} value={stock.stock_id}>
                          {drugs.find(test => test.drug_id === drug[0])?.drug_name_generic} {drugs.find(test => test.drug_id === drug[0])?.drug_form} {' '}
                          {stock.drug_brand} {stock.drug_dose} {stock.unit} {formatDateToLocal(stock.expdate)} {formatCurrency(stock.sell_price)} {'Available Quantity: '}{stock.total_quantity}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="amount" className=" mt-2 block text-sm font-medium">Amount: </label>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Amount of medicine"
                    value={totalPills}
                    readOnly
                    className="peer mb-2 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
              {/* <Link
                href="/dashboard/dispenser"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
              >
                Cancel
              </Link> */}
              <Button type="submit">Dispense</Button>
              </div>
              </div>

            ))}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/dispenser"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        {/* <Button type="submit">Dispense</Button> */}
      </div>
    </form>
  );
}
