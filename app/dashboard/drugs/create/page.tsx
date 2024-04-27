import Form from '@/app/ui/drugs/create-form';
import Breadcrumbs from '@/app/ui/patients/breadcrumbs';
 
export default async function Page() {
  //const patients = await fetchPatients1();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Drugs', href: '/dashboard/drugs' },
          {
            label: 'Add Drug',
            href: '/dashboard/drugs/create',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}