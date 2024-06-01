import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function dispenseStatus({ status }: { status: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-red-500 border-4 border-grey-400': status === false,
          'bg-green-500 text-white border-4 border-green-400': status === true,
        },
      )}
    >
      {status === false ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-red-500" />
        </>
      ) : null}
      {status === true ? (
        <>
          Dispensed
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
