import { PencilIcon, PlusIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteDrug, deleteStock } from '@/app/lib/actions';

export function AddDrug() {
    return (
      <Link
        href="/dashboard/drugs/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Add Drug</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  }

  export function UpdateDrug({ id }: { id: string }) {
    return (
      <Link
        href={`/dashboard/drugs/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    );
  }

  export function DeleteDrug({ id }: { id: string }) {
    const deleteDrugWithId = deleteDrug.bind(null, id);
    return (
      <form action={deleteDrugWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    );
  }

  export function ViewDrug({ id }: { id: string }) {
    return (
      <Link
        href={`/dashboard/drugs/${id}/viewstock`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <EyeIcon className="w-5" />
      </Link>
    );
  }

  export function AddStock({ id }: { id: string }) {
    return (
      <Link
        href={`/dashboard/drugs/stocks/${id}/`}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Add Drug Stock</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  }

  export function DeleteStock({ id }: { id: string }) {
    const deleteDrugWithId = deleteStock.bind(null, id);
    return (
      <form action={deleteDrugWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    );
  }