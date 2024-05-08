import { UpdateDrug, DeleteStock, UpdateStock, ViewDrug } from '@/app/ui/drugs/buttons';
import { fetchDrugById, fetchManufacturers, fetchManufacturersById, fetchStocksById } from '@/app/lib/data';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { notFound } from 'next/navigation';

export default async function DrugsTable(id: {id: string}) {
    console.log(id.id);
    const [drugstocks] = await Promise.all([
            fetchStocksById(id.id),
          ]);
          if (!drugstocks) {
            notFound();
          };
    const drugDetails = await fetchDrugById(id.id);
    const manufac = await fetchManufacturers();

    
          console.log(drugstocks);
    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {drugstocks?.map((stock) => (
                <div
                  key={stock.stock_id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                      <div className="mb-2 flex items-center">
                        <p>{stock.drug_brand}</p>
                        <p>{stock.drug_dose}</p>
                        <p>{stock.unit}</p>
                      </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p>{stock.manufacturer_id}</p>
                      <p>{stock.total_quantity}</p>
                      <p>{stock.sell_price}</p>
                      <p>{formatCurrency(stock.sell_price)}</p>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      {/* <ViewDrug id={stock.drug_id} /> */}
                      <UpdateDrug id={stock.drug_id} />
                      <DeleteStock id={stock.stock_id} />
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  
                  <th scope="col" className="px-3 py-5 font-medium">
                    Brand name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Dose
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Unit
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Manufacturer
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Quantity Available
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Sell Price
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Expiary date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-center">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {drugstocks?.map((stock) => (
                  <tr
                    key={stock.stock_id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    
                    <td className="whitespace-normal px-3 py-3">
                      {stock.drug_brand}
                    </td>
                    <td className="whitespace-normal px-3 py-3">
                      {stock.drug_dose}
                    </td>
                    <td className="whitespace-normal px-3 py-3">
                      {stock.unit}
                    </td>
                    <td className="whitespace-normal px-3 py-3">
                      {manufac.find(test => test.id === stock.manufacturer_id)?.name}
                      {/* {stock.manufacturer_id} */}
                    </td>
                    <td className="whitespace-normal px-3 py-3">
                      {stock.total_quantity}
                    </td>
                    <td className="whitespace-normal px-3 py-3">
                      {formatCurrency(stock.sell_price)}
                    </td>
                    <td className="whitespace-norwrap px-3 py-3">
                      {formatDateToLocal(stock.expdate)}
                    </td>
                    <td className="whitespace-normal py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        {/* <ViewPatient id = {patient.p_id}/> */}
                        {/* <ViewDrug id={stock.drug_id} /> */}
                        <UpdateStock id={stock.drug_id} />
                        <DeleteStock id={stock.stock_id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  
  