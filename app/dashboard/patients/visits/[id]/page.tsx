
import Form from '@/app/ui/patients/visit-form';
import Breadcrumbs from '@/app/ui/patients/breadcrumbs';
import { fetchVisitsById, fetchPatientById, fetchDrugsforForm } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { PatientsTableType, VisitsTable } from '@/app/lib/definitions';
import OverviewCard from '@/app/ui/patients/overview';

 
export default async function Page({ params }: { params: { id: string } }) {
  const p_id = params.id;

  const patient = await Promise.all([
    fetchPatientById(p_id),
  ]);
  if (!patient) {
    notFound();
  }

  const [drugs] = await Promise.all([
    fetchDrugsforForm(),
  ]);
  if (!drugs) {
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
      <OverviewCard patient = {patient[0]}/>
      <Form patient_id = {p_id} patient_details={patient} drugs = {drugs}/>
    </main>
  );
}