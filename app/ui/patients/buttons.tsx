import { PencilIcon, PlusIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deletePatient, deleteVisit } from '@/app/lib/actions';


export function AddPatient1() {
    return (
      <Link
        href="/dashboard/patients/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Add Patient</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  }

  export function UpdatePatient({ id }: { id: string }) {
    return (
      <Link
        href={`/dashboard/patients/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100 bg-white"
      >
        <PencilIcon className="w-5" />
      </Link>
    );
  }

  export function DeletePatient({ id }: { id: string }) {
    const deletePatientWithId = deletePatient.bind(null, id);
    return (
      <form action={deletePatientWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100 bg-white">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    );
  }

  export function ViewPatient({ id }: { id: string }) {
    return (
      <Link
        href={`/dashboard/patients/${id}/edit/view`}
        className="rounded-md border p-2 hover:bg-gray-100 bg-white"
      >
        <EyeIcon className="w-5" />
      </Link>
    );
  }

  export function AddVisit({ id }: { id: string }) {
    return (
      <Link
        href={`/dashboard/patients/visits/${id}`}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Add Visit</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  }

  export function DeleteVisit({ id }: { id: string }) {
    const deleteVisitWithId = deleteVisit.bind(null, id);
    return (
      <form action={deleteVisitWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100 bg-white">
          {/* <span className="sr-only">Delete</span> */}
          <TrashIcon className="w-5" />
        </button>
      </form>
    );
  }

