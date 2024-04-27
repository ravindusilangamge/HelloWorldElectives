import Form from '@/app/ui/drugs/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchDrugById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [drug] = await Promise.all([
        fetchDrugById(id),
      ]);
      if (!drug) {
        notFound();
      }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Drugs', href: '/dashboard/drugs' },
          {
            label: 'Edit Drug',
            href: `/dashboard/drugs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form drug={drug} />
    </main>
  );
}