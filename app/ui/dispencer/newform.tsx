'use client'

import { addDrugsSale2 } from "@/app/lib/actions";
import { DrugStocksTable, DrugsTableType } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "../button";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { useState } from "react";

export default function Form({drug, dose, freq, days, drugdetails, drugstocks, visit_id, totalValue}: {drug: string, dose: number, freq: number, days: number, drugdetails: DrugsTableType[], drugstocks: DrugStocksTable[], visit_id: string, totalValue: number}){
    const [selectedDrugDose, setSelectedDrugDose] = useState<number | 1>(1);
    const [selectedDrugSellPrice, setSelectedDrugSellPrice] = useState<number | 1>(1);
    const [display, setDisplay] = useState<boolean | false>(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [buttonString, setButtonString] = useState<string | 'Add'>('Add')

    const handleDrugSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const drugId = event.target.value;
        const selectedDrug = drugstocks.find(test => test.stock_id === drugId);
        setSelectedDrugDose(selectedDrug?.drug_dose || 1);
        setSelectedDrugSellPrice(selectedDrug?.sell_price || 1);
        setDisplay(true);
        totalValue += 1;
    };

    const handleButtonClick = () => {
        setButtonClicked(true); // Update state when button is clicked
        setButtonString('Added!');
    };
    
    return (
        <div>
            {/* Drug Name: {drugdetails.find(test => test.drug_id === drug)?.drug_name_generic}  */}
            <form action={'addDrugsSale2'}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* Visit ID */}
                    <input type="hidden" name="visit_id" value={visit_id} />

                    {/* Stock ID */}
                    <div className="mb-4">
                    <label htmlFor="drugdetails" className="mb-2 block text-sm font-medium">
                        Drug Details: {drugdetails.find(test => test.drug_id === drug)?.drug_name_generic} {' '} {drugdetails.find(test => test.drug_id === drug)?.drug_form}
                    </label>
                    <div className="relative">
                        <select
                        id="stock"
                        name="stock_id"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue=""
                        onChange={handleDrugSelect}
                        >
                        <option value="" disabled>
                            Select a drug brand
                        </option>
                        {drugstocks
                        .filter(stock => stock.drug_id === drug)
                        .map((drugbrand) => (
                            <option key={drugbrand.stock_id} value={drugbrand.stock_id}>
                                {/* {drugbrand.stock_id} */}
                                {drugdetails.find(test => test.drug_id === drug)?.drug_name_generic} {drugdetails.find(test => test.drug_id === drug)?.drug_form} {' '}
                                {drugbrand.drug_brand} {' Dose: '} {drugbrand.drug_dose} {drugbrand.unit} {' Exp. Date: '} {formatDateToLocal(drugbrand.expdate)} {' Price: '} {formatCurrency(drugbrand.sell_price)} {'Available Quantity: '}{drugbrand.total_quantity}
                            </option>
                        ))}
                        </select>
                    </div>
                    
                    {display &&(
                        <div>
                        <label htmlFor="quantity" className="mb-2 mt-2 block text-sm font-medium">
                            Quantity: {dose*freq*days/selectedDrugDose}
                        </label>
                        <label htmlFor="sellprice" className="mb-2 mt-2 block text-sm font-medium">
                            Amount: {formatCurrency((dose*freq*days/selectedDrugDose)*selectedDrugSellPrice)}
                        </label>
                        </div>
                    )}
                    
                    <input type="hidden" name="quantity" value={dose*freq*days/selectedDrugDose} />
                    <input type="hidden" name="amount" value={(dose*freq*days/selectedDrugDose)*selectedDrugSellPrice} />
                    </div>

                    
                </div>
                <div className="mt-4 mb-4 flex justify-end gap-4">
                    <Button type="submit" onClick={handleButtonClick} className={buttonClicked ? 'bg-red-500 hover:bg-red-400' : ''}>
                        {buttonString}
                    </Button>
                </div>
            </form>            
        </div>
    );
}