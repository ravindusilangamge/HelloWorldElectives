import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/drugs/addmanufacturer";

export default async function page() {
    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Drugs', href: '/dashboard/drugs' },
          {
            label: 'Add Manufacturer',
            href: '/dashboard/drugs/suppliers',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
    );
}