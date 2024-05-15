'use client'

import { prescriptionTable } from "@/app/lib/definitions";
import { formatCurrency } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { updateVisitPrescription } from "@/app/lib/actions";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

export default function Form({drugsDispensed, id, totalValue}: {drugsDispensed: prescriptionTable[], id: string,totalValue: number}) {
    noStore();
    const [billValue, setBillValue] = useState<number | 0>(0);
    useEffect(() => {
        // Calculate total bill value when drugsDispensed changes
        const totalBill = drugsDispensed.reduce((acc, prescription) => {
            // Assuming each prescription has a property called 'value'
            return acc + prescription.billvalue;
        }, 0);

        // Update state with the total bill value
        setBillValue(totalBill);
    }, [drugsDispensed, totalValue]);
    const updateDispenseVisitId = updateVisitPrescription.bind(null, id);
    return (
        <div>
            <form action = {updateDispenseVisitId}>
            <label className=" items-center bg-grey-100 px-3 py-1.5 text-md mb-4 font-medium text-gray-800">
                Total amount = {formatCurrency(billValue)}
            </label>
            <input type = "hidden" name = "dispensed" value={'true'}></input>
            <div className="mt-4 mb-4 flex justify-end gap-4">
                    <Link
                    href="/dashboard/dispencer"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                    Cancel
                    </Link>
                    <Button type="submit">
                        Dispense
                    </Button>
                </div>
            </form>
        </div>
    );
}