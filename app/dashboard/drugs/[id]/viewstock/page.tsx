import { fetchStocksById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import Table from '@/app/ui/drugs/stockstable'; 
import { AddStock } from '@/app/ui/drugs/buttons';


export default async function Page( { params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);
return (
  <main>
  <Breadcrumbs
  breadcrumbs={[
    { label: 'Drugs', href: '/dashboard/drugs' },
    {
      label: 'Edit Drug stocks',
      href: `/dashboard/drugs/${id}/viewstock/`,
      active: true,
    },
  ]}/>
  <div><AddStock id={id}></AddStock></div>
  <Table id={id}/>

{/* <Form invoice={invoice} customers={customers} /> */}
    </main>
  );
}