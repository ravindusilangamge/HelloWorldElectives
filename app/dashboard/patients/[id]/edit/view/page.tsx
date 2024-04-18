import OverviewCard from '@/app/ui/patients/overview';
import VisitTable from '@/app/ui/patients/visits-table';
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
            label: 'Overview',
            href: `/dashboard/patients/${id}/edit/view`,
            active: true,
          },
        ]}
      />
      {/* <Form patient={patient} /> */}
      <OverviewCard patient = {patient}/>
      <br></br>
      <h1>Visit Details</h1>
      
      <VisitTable patient1 = {patient}/>
    </main>
  );
}