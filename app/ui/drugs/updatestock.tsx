'use client'
import Link from 'next/link';
import { Button } from '@/app/ui/button';
//import { PatientsTableType, DrugsTableType, DrugStocksTable } from '@/app/lib/definitions';
import { addStock, updateStock } from '@/app/lib/actions';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DrugStocksTable, DrugsTableType, ManufacturersTable, SuppliersTable } from '@/app/lib/definitions';
import { UserCircleIcon } from '@heroicons/react/24/outline';



export default function Form({ stock, suppliers, manufacturers }: { stock: DrugStocksTable; suppliers: SuppliersTable[]; manufacturers: ManufacturersTable[]}) {   
    interface FormValues {
        container_quantity: number;
        units_per_container: number;
        total_quantity: number;
    }
    
    // Function to calculate total quantity
    function calculateTotalQuantity() {
        const containerQuantityInput = document.getElementById("container_quantity") as HTMLInputElement;
        const unitsPerContainerInput = document.getElementById("units_per_container") as HTMLInputElement;
        const totalQuantityInput = document.getElementById("total_quantity") as HTMLInputElement;
    
        const containerQuantity = parseInt(containerQuantityInput.value);
        const unitsPerContainer = parseInt(unitsPerContainerInput.value);
    
        if (!isNaN(containerQuantity) && !isNaN(unitsPerContainer)) {
            const totalQuantity = containerQuantity * unitsPerContainer;
            totalQuantityInput.value = totalQuantity.toString();
        } else {
            totalQuantityInput.value = ""; // Reset the value if any input is empty or non-numeric
        }
    }

    React.useEffect(() => {
        const containerQuantityInput = document.getElementById("container_quantity");
        if (containerQuantityInput) {
            containerQuantityInput.addEventListener("input", calculateTotalQuantity);
        }
    
        const unitsPerContainerInput = document.getElementById("units_per_container");
        if (unitsPerContainerInput) {
            unitsPerContainerInput.addEventListener("input", calculateTotalQuantity);
        }

        return () => {
            // Clean up event listeners on unmount
            if (containerQuantityInput) {
                containerQuantityInput.removeEventListener("input", calculateTotalQuantity);
            }
            if (unitsPerContainerInput) {
                unitsPerContainerInput.removeEventListener("input", calculateTotalQuantity);
            }
        };
    }, []);

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(stock.mfdate));
    const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date(stock.expdate));

    const updateStockWithId = updateStock.bind(null, stock.stock_id);


    return(
    <div>
        <form action={updateStockWithId}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6"> 
                    <input
                        id="drug_id"
                        name="drug_id"
                        type="hidden"
                        defaultValue={stock.drug_id}
                    />
                
                    <div className="mb-4">
                        <label htmlFor="drug_brand" className="mb-2 block text-sm font-medium">
                            Drug Brand?
                        </label>
                        <div className="relative mt-2 mb-4 rounded-md">
                            <div className="relative">
                                <input
                                    id="drug_brand"
                                    name="drug_brand"
                                    type="string"
                                    placeholder="Enter drug brand..."
                                    defaultValue={stock.drug_brand}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="manufacturer" className="mb-2 block text-sm font-medium">
                            Choose manufacturer...
                        </label>
                        <div className="relative">
                            <select
                            id="manufacturer"
                            name="manufacturer"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={manufacturers.find(test => test.id === stock.manufacturer_id)?.name}
                            >
                            <option value="" disabled>
                                Select a manufacturer
                            </option>
                            {manufacturers.map((manufacturer) => (
                                <option key={manufacturer.id} value={manufacturer.id}>
                                    {manufacturer.name}
                                </option>
                            ))}
                            </select>
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                        </div>

                    <div className="mb-4">
                        <label htmlFor="drug_dose" className="mb-2 block text-sm font-medium">
                            Drug dose?
                        </label>
                        <div className="relative mt-2 mb-4 rounded-md">
                            <div className="relative">
                                <input
                                    id="drug_dose"
                                    name="drug_dose"
                                    type="number"
                                    placeholder="Enter drug dose..."
                                    defaultValue={stock.drug_dose}
                                    className="peer w-50% rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                                <label htmlFor="unit" className="mt-2 mb-2 pl-2 pr-2 text-sm font-medium">Unit: </label>
                                <input
                                    id="unit"
                                    name="unit"
                                    type="string"
                                    placeholder="Enter unit..."
                                    defaultValue={stock.unit}
                                    className="peer  w-50% rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="container_quantity" className="mb-2 block text-sm font-medium">
                            Container quantity?
                        </label>
                        <div className="relative mt-2 mb-4 rounded-md">
                            <div className="relative">
                                <input
                                    id="container_quantity"
                                    name="container_quantity"
                                    type="number"
                                    placeholder="Enter container quantity..."
                                    defaultValue={stock.container_quantity}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="units_per_container" className="mb-2 block text-sm font-medium">
                            Units per container?
                        </label>
                        <div className="relative mt-2 mb-4 rounded-md">
                            <div className="relative">
                                <input
                                    id="units_per_container"
                                    name="units_per_container"
                                    type="number"
                                    placeholder="Enter units per container..."
                                    defaultValue={stock.units_per_container}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="total_quantity" className="mb-2 block text-sm font-medium">
                            Total quantity?
                        </label>
                        <div className="relative mt-2 mb-4 rounded-md">
                            <div className="relative">
                                <input
                                    id="total_quantity"
                                    name="total_quantity"
                                    type="number"
                                    placeholder="Enter total quantity..."
                                    defaultValue={stock.total_quantity}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="supplier" className="mb-2 block text-sm font-medium">
                            Choose supplier...
                        </label>
                        <div className="relative">
                            <select
                            id="supplier"
                            name="supplier"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={suppliers.find(test => test.id === stock.supplier_id)?.name}
                            >
                            <option value="" disabled>
                                Select a supplier
                            </option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                            </select>
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                        </div>

                    <div className="mb-4">
                        <label htmlFor="mfdate" className="mb-2 block text-sm font-medium">
                            Drug manufactured date?
                        </label>
                        <div className="relative mt-2 mb-4 rounded-md">
                            <div className="relative">
                            <DatePicker
                                id="mfdate"
                                name='mfdate'
                                selected={selectedDate || new Date()}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                            />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="expdate" className="mb-2 block text-sm font-medium">
                            Drug expire date?
                        </label>
                        <div className="relative mt-2 mb-4 rounded-md">
                            <div className="relative">
                            <DatePicker
                                id="expdate"
                                name='expdate'
                                selected={selectedDate1 || new Date()}
                                onChange={(date) => setSelectedDate1(date)}
                                dateFormat="yyyy-MM-dd"
                                className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                            />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="buy_price" className="mb-2 block text-sm font-medium">
                            Drug buy price?
                        </label>
                        <div className="relative mt-2 mb-4 rounded-md">
                            <div className="relative">
                                <input
                                    id="buy_price"
                                    name="buy_price"
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter drug buy price..."
                                    defaultValue={stock.buy_price/100}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="sell_price" className="mb-2 block text-sm font-medium">
                            Drug sell price?
                        </label>
                        <div className="relative mt-2 mb-4 rounded-md">
                            <div className="relative">
                                <input
                                    id="sell_price"
                                    name="sell_price"
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter drug sell price..."
                                    defaultValue={stock.sell_price/100}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                  href = {`/dashboard/drugs/${stock.drug_id}/viewstock`}
                  className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                  Cancel
                </Link>
                <Button type="submit">Update Stock</Button>
            </div>
        </form>
    </div>
    );
}