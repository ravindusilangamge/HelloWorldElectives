import { GlobeAltIcon, HeartIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      {/* <HeartIcon className="h-12 w-12 rotate-[0deg]"/> */}
      <p className="text-[44px]">Methsuwa</p>
    </div>
  );
}
