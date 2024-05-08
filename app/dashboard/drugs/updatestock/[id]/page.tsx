import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/drugs/updatestock";
import { fetchSuppliers, fetchManufacturers, fetchStocksById } from "@/app/lib/data";
//update stock page
export default async function Page( { params }: { params: { id: string } }) {
    const id = params.id;

    const suppliers = await fetchSuppliers();
    const manufacturers = await fetchManufacturers();
    const stockDetails = await fetchStocksById(id);
    
    console.log(id);
    return (
    <main>
    <Breadcrumbs
    breadcrumbs={[
        { label: 'Drugs', href: '/dashboard/drugs' },
        {
        label: 'Edit Drug stocks',
        href: `/dashboard/drugs/${id}/viewstock/`,
        active: true,
        },
    ]}/>
        <Form stock= {stockDetails[0]} suppliers={suppliers} manufacturers={manufacturers}/> 
        </main>
    );
}