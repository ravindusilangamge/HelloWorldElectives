'use client'
import { addDrugsSale2, updateVisitPrescription } from "@/app/lib/actions";
import { DrugStocksTable, DrugsTableType, VisitsTable } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "../button";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { FormEvent, useState } from "react";

// Define types for props
interface FormProps {
    id: string;
    drugdetails: DrugsTableType[];
    drugstocks: DrugStocksTable[];
    visit_id: string;
    visitdetails: VisitsTable;
}

export default function Form({ id, drugdetails, drugstocks, visit_id, visitdetails }: FormProps) {
    const [selectedDrugDose, setSelectedDrugDose] = useState<number[]>(new Array(visitdetails.prescription.length).fill(1));
    const [selectedDrugSellPrice, setSelectedDrugSellPrice] = useState<number[]>(new Array(visitdetails.prescription.length).fill(1));
    const [display, setDisplay] = useState<boolean[]>(new Array(visitdetails.prescription.length).fill(false));
    const [buttonClicked, setButtonClicked] = useState<boolean[]>(new Array(visitdetails.prescription.length).fill(false));
    const [buttonString, setButtonString] = useState<string[]>(new Array(visitdetails.prescription.length).fill('Add'));
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const handleDrugSelect = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const drugId = event.target.value;
        const selectedDrug = drugstocks.find(test => test.stock_id === drugId);

        setSelectedDrugDose(prevDoses => {
            const newDoses = [...prevDoses];
            newDoses[index] = selectedDrug?.drug_dose || 1;
            return newDoses;
        });

        setSelectedDrugSellPrice(prevPrices => {
            const newPrices = [...prevPrices];
            newPrices[index] = selectedDrug?.sell_price || 1;
            return newPrices;
        });

        setDisplay(prevDisplay => {
            const newDisplay = [...prevDisplay];
            newDisplay[index] = true;
            return newDisplay;
        });

        setButtonClicked(prevClicked => {
            const newClicked = [...prevClicked];
            newClicked[index] = false;
            return newClicked;
        });

        setButtonString(prevStrings => {
            const newStrings = [...prevStrings];
            newStrings[index] = 'Add';
            return newStrings;
        });
    };

    const handleButtonClick = (price: number, index: number) => {
        setTotalPrice(prevTotalPrice => prevTotalPrice + price);

        setButtonClicked(prevClicked => {
            const newClicked = [...prevClicked];
            newClicked[index] = true;
            return newClicked;
        });

        setButtonString(prevStrings => {
            const newStrings = [...prevStrings];
            newStrings[index] = 'Added!';
            return newStrings;
        });
    };

    const handleDispense = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const totalDrugs = visitdetails.prescription.length;
        const formData = new FormData(event.currentTarget);

        try {
            //updateVisitPrescription.bind(null, id); 
            await updateVisitPrescription(id, formData);
            await addDrugsSale2(formData, totalDrugs);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (e.g., show notification to the user)
        }
    };

    return (
        <form onSubmit={handleDispense}>
            {visitdetails.prescription.map((item, index) => (
                <div key={index}>
                    <div className="rounded-md bg-gray-50 p-4 md:p-6">
                        <input type="hidden" name={`visit_id_${index}`} value={visit_id} />

                        <div className="mb-4">
                            <label htmlFor={`drugdetails_${index}`} className="mb-2 block text-sm font-medium">
                                Drug Details: {drugdetails.find(test => test.drug_id === item[0])?.drug_name_generic} {' '}
                                {drugdetails.find(test => test.drug_id === item[0])?.drug_form}
                            </label>
                            <div className="relative">
                                <select
                                    id={`stock_${index}`}
                                    name={`stock_id_${index}`}
                                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    defaultValue=""
                                    onChange={(event) => handleDrugSelect(event, index)}
                                >
                                    <option value="" disabled>
                                        Select a drug brand
                                    </option>
                                    {drugstocks
                                        .filter(stock => stock.drug_id === item[0])
                                        .map((drugbrand) => (
                                            <option key={drugbrand.stock_id} value={drugbrand.stock_id}>
                                                {drugdetails.find(test => test.drug_id === item[0])?.drug_name_generic} {drugdetails.find(test => test.drug_id === item[0])?.drug_form} {' '}
                                                {drugbrand.drug_brand} {' Dose: '} {drugbrand.drug_dose} {drugbrand.unit} {' Exp. Date: '} {formatDateToLocal(drugbrand.expdate)} {' Price: '} {formatCurrency(drugbrand.sell_price)} {'Available Quantity: '}{drugbrand.total_quantity}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {display[index] && (
                                <div>
                                    <label htmlFor={`quantity_${index}`} className="mb-2 mt-2 block text-sm font-medium">
                                        Quantity: {parseInt(item[1]) * parseInt(item[2]) * parseInt(item[3]) / selectedDrugDose[index]}
                                    </label>
                                    <label htmlFor={`sellprice_${index}`} className="mb-2 mt-2 block text-sm font-medium">
                                        Amount: {formatCurrency((parseInt(item[1]) * parseInt(item[2]) * parseInt(item[3]) / selectedDrugDose[index]) * selectedDrugSellPrice[index])}
                                    </label>
                                </div>
                            )}

                            <input type="hidden" name={`quantity_${index}`} value={parseInt(item[1]) * parseInt(item[2]) * parseInt(item[3]) / selectedDrugDose[index]} />
                            <input type="hidden" name={`amount_${index}`} value={(parseInt(item[1]) * parseInt(item[2]) * parseInt(item[3]) / selectedDrugDose[index]) * selectedDrugSellPrice[index]} />
                        </div>
                    </div>
                    <div className="mt-4 mb-4 flex justify-end gap-4">
                        <Button type="button" onClick={() => handleButtonClick((parseInt(item[1]) * parseInt(item[2]) * parseInt(item[3]) / selectedDrugDose[index]) * selectedDrugSellPrice[index], index)} className={buttonClicked[index] ? 'bg-red-500 hover:bg-red-400' : ''}>
                            {buttonString[index] || 'Add'}
                        </Button>
                    </div>
                </div>
            ))}
            <label className="items-center bg-grey-100 px-3 py-1.5 text-md mb-4 font-medium text-gray-800">
                Total amount = {formatCurrency(totalPrice)}
            </label>
            <input type="hidden" name="dispensed" value="true" />
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
    );
}
