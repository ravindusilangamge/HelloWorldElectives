import { UpdateDrug, DeleteDrug, ViewDrug } from '@/app/ui/drugs/buttons';
import { fetchDrugs } from '@/app/lib/data';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

export default async function DrugsTable({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) {
    const drugs = await fetchDrugs(query, currentPage);
    console.log('These are drugs retrieved',drugs);
  
    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-blue-400 p-2 md:pt-0">
            <div className="md:hidden">
              {drugs?.map((drug) => (
                <div
                  key={drug.drug_id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                      <div className="mb-2 flex items-center">
                        <p>{drug.drug_name_generic}</p>
                        <p>{drug.drug_form}</p>
                      </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    {/* <div>
                      <p className="text-xl font-medium">
                        {drug.drug_brand}
                      </p>
                      <p>{drug.manufacturer}</p>
                      <p>{drug.total_quantity}</p>
                      <p>{drug.sell_price}</p>
                      <p>{formatCurrency(drug.sell_price)}</p>
                    </div> */}
                    <div className="flex justify-end gap-2">
                      <ViewDrug id={drug.drug_id} />
                      <UpdateDrug id={drug.drug_id} />
                      <DeleteDrug id={drug.drug_id} />
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-white text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Drug ID
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-right">
                    Generic name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Formulation
                  </th>
                  {/* <th scope="col" className="px-3 py-5 font-medium">
                    Brand
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
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white">
                {drugs?.map((drug, index) => (
                  <tr
                    key={drug.drug_id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3 w-5">
                      <div className='truncate'>{drug.drug_id.slice(0,8)}</div>
                      {/* <div className="flex items-center gap-3">
                        
                      </div> */}
                    </td>
                    <td className="whitespace-normal px-3 py-3 text-right">
                      {drug.drug_name_generic}
                    </td>
                    <td className="whitespace-normal px-3 py-3 text-left">
                      {drug.drug_form}
                    </td>
                    {/* <td className="whitespace-normal px-3 py-3">
                      {drug.drug_brand}
                    </td>
                    <td className="whitespace-normal px-3 py-3">
                      {drug.manufacturer}
                    </td>
                    <td className="whitespace-normal px-3 py-3">
                      {drug.total_quantity}
                    </td>
                    <td className="whitespace-normal px-3 py-3">
                      {formatCurrency(drug.sell_price)}
                    </td>
                    <td className="whitespace-norwrap px-3 py-3">
                      {formatDateToLocal(drug.expdate)}
                    </td> */}
                    <td className="whitespace-normal py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        {/* <ViewPatient id = {patient.p_id}/> */}
                        <ViewDrug id={drug.drug_id} />
                        <UpdateDrug id={drug.drug_id} />
                        <DeleteDrug id={drug.drug_id} />
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
  
  
  