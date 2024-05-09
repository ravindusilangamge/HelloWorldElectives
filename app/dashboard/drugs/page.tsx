import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchDrugsPages } from '@/app/lib/data';
import Pagination from '@/app/ui/invoices/pagination';
import Table from '@/app/ui/drugs/table';
import { AddDrug, AddSupplier, AddManufacturer } from '@/app/ui/drugs/buttons';

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchDrugsPages(query);
    return(
        <div className="">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Drug Details</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search drugs..." />
                <AddDrug />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense> 
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
            <div className='w-full mt-4 mb-4 ml-4 mr-4 justify-center items-center'>
              <div className='flex justify-center'>
                <div className='mr-2 ml-2'><AddSupplier/></div>
                <div className='mr-2 ml-2'><AddManufacturer/></div>
              </div>
            </div>
            <div>
                <iframe
                  src="https://metabase.expergen.com/public/dashboard/7d9b7cfd-606d-47e4-b43c-0b121383083c"
                  frameBorder="0"
                  width="100%"
                  height="600"
                  allowTransparency
              ></iframe>
            </div>
            
        </div>
        
    );
  }