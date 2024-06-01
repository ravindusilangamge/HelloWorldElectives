'use client'
import React, { useEffect, useState } from 'react';
import { prescriptionTable, PatientsTableType, DrugStocksTable, DrugsTableType } from '@/app/lib/definitions';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import test from 'node:test';

export default function Invoice(
    {   
        id,
        prescriptionData, 
        patientData,
        stockData,
        drugData
    }: 
    {
        id: string,
        prescriptionData: prescriptionTable[], 
        patientData: PatientsTableType,
        stockData: DrugStocksTable[],
        drugData: DrugsTableType[]
    }) {
    const date = prescriptionData[0].date;
    const [totalBill, setTotalBill] = useState<number>(0);
    // {prescriptionData.map((test) => (
    //     settotalBill(prevTotalPrice => prevTotalPrice + test.billvalue)
    // ))};
    useEffect(() => {
        const calculatedTotalBill = prescriptionData.reduce((total, test) => total + test.billvalue, 0);
        setTotalBill(calculatedTotalBill);
      }, [prescriptionData]);

  return (
    <div className="p-6 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <header className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Medical Invoice</h1>
          <div>
            <p className="text-sm font-semibold">Invoice Number</p>
            <p>{id.slice(0,10)}</p>
            <p className="text-sm font-semibold">Order Date</p>
            <p>{formatDateToLocal(date)}</p>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Patient Information</h2>
            <p>{patientData.name}</p>
            <p>{patientData.phonenumber}</p>
            <p>{patientData.address}</p>
            {/* <p>New York, NY, 433545</p>
            <p>United States</p> */}
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Methsuwa Family Clinic</h2>
            <p>Dr. Pasantha Illeperuma</p>
            <p className='text-sm'>MBBS(Colombo)</p>
            <p className='text-sm'>071-801-2049</p>
            <p className='text-sm'>No. 607, Madamandiya, Panagoda, Homagama.</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Medicines</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Unit Price</th>
                <th className="border px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[...prescriptionData].map((_, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{drugData.find(test => test.drug_id === (stockData.find(apple => apple.stock_id === prescriptionData[index].stock_id)?.drug_id))?.drug_name_generic}{' '}
                    {drugData.find(test => test.drug_id === (stockData.find(apple => apple.stock_id === prescriptionData[index].stock_id)?.drug_id))?.drug_form}
                  </td>
                  <td className="border px-4 py-2">{prescriptionData[index].servedquantity}</td>
                  <td className="border px-4 py-2">{formatCurrency(stockData.find(test => test.stock_id === prescriptionData[index].stock_id)?.sell_price ?? 0)}</td>
                  <td className="border px-4 py-2">{formatCurrency(prescriptionData[index].billvalue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="flex justify-between items-center mt-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Cash</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Total Amount</h2>
            <p>{formatCurrency(totalBill)}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

