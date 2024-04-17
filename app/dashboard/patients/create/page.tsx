import Form from '@/app/ui/patients/create-form';
import Breadcrumbs from '@/app/ui/patients/breadcrumbs';
//import { fetchPatients1, fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  //const patients = await fetchPatients1();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Patients', href: '/dashboard/patients' },
          {
            label: 'Add patient',
            href: '/dashboard/patients/create',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}