import Breadcrumbs from "@/app/ui/patients/breadcrumbs";
import Form from "@/app/ui/drugs/add-stock"

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    console.log(id);
    return (
        <main>
            <Breadcrumbs
            breadcrumbs={[
                { label: 'Drugs', href: '/dashboard/drugs' },
                { label: id, href: `/dashboard/drugs/${id}/viewstock` },
                {
                label: 'Add Stock',
                href: `/dashboard/drugs/stocks/${id}`,
                active: true,
                },
                
            ]}
            />
            <div>
                <Form id={id}/>
            </div>
            {/* <Form patient_id = {p_id} patient_details={patient} drugs = {drugs}/> */}
        </main>);
};