import Form from '@/app/ui/patients/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchPatientById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [patient] = await Promise.all([
        fetchPatientById(id),
      ]);
      if (!patient) {
        notFound();
      }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Patients', href: '/dashboard/patients' },
          {
            label: 'Edit Patient',
            href: `/dashboard/patients/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form patient={patient} />
    </main>
  );
}