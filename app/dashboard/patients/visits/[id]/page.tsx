import Form from '@/app/ui/patients/visit-form';
import Breadcrumbs from '@/app/ui/patients/breadcrumbs';
import { fetchVisitsById, fetchPatientById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { PatientsTableType, VisitsTable } from '@/app/lib/definitions';
 
export default async function Page({ params }: { params: { id: string } }) {
  const p_id = params.id;

  const patient = await Promise.all([
    fetchPatientById(p_id),
  ]);
  if (!patient) {
    notFound();
  }
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Patients', href: '/dashboard/patients' },
          { label: p_id, href: `/dashboard/patients/${p_id}/edit/view` },
          {
            label: 'Add Visit',
            href: '/dashboard/patients/visits',
            active: true,
          },
          
        ]}
      />
      <Form p_id={p_id}/>
    </main>
  );
}