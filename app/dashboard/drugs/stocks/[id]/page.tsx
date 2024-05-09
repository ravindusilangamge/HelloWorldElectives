import Breadcrumbs from "@/app/ui/patients/breadcrumbs";
import Form from "@/app/ui/drugs/add-stock";
import { fetchSuppliers, fetchManufacturers, fetchDrugById } from "@/app/lib/data";


export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const drugdetails = await fetchDrugById(id);
    const suppliers = await fetchSuppliers();
    const manufacturers = await fetchManufacturers();
    console.log(id);
    return (
        <main>
            <Breadcrumbs
            breadcrumbs={[
                { label: 'Drugs', href: '/dashboard/drugs' },
                { label: `${drugdetails.drug_name_generic}  ${drugdetails.drug_form}`, href: `/dashboard/drugs/${id}/viewstock` },
                {
                label: 'Add Stock',
                href: `/dashboard/drugs/stocks/${id}`,
                active: true,
                },
                
            ]}
            />
            <div>
                <Form id={id} suppliers={suppliers} manufacturers={manufacturers}/>
            </div>
            {/* <Form patient_id = {p_id} patient_details={patient} drugs = {drugs}/> */}
        </main>);
};