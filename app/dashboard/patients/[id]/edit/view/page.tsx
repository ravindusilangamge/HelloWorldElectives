import OverviewCard from '@/app/ui/patients/overview';
import VisitTable from '@/app/ui/patients/visits-table';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchPatientById, fetchVisitsById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Search from '@/app/ui/search';
import { AddVisit } from '@/app/ui/patients/buttons';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [patient] = await Promise.all([
        fetchPatientById(id),
      ]);
      if (!patient) {
        notFound();
      }
      const [patient1] = await Promise.all([
        fetchVisitsById(id),
      ]);
      if (!patient1) {
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
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search visits..." />
        <AddVisit id = {id}/>
      </div>
      
      <VisitTable patient1 = {patient1}/>
    </main>
  );
}