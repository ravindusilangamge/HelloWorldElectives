'use client'
import { fetchPatientById, fetchVisitsById } from '@/app/lib/data';
import { PatientsTableType, VisitsTable } from '@/app/lib/definitions';
import { formatDateToLocal,  } from '@/app/lib/utils';
import React, { Fragment, useRef, useState } from 'react';
import { Button } from '../button';
import { ExclamationTriangleIcon, EyeIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { DeleteVisit } from './buttons';



export default function VisitTable({patient1}: {patient1: VisitsTable[];}){
    let [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

    let [pcom, setpcom ] = useState('');
    let [hpc, sethpc ] = useState('');
    let [invsf, setinvsf ] = useState('');
    let [prescription, setprescription ] = useState('');
    let [examination, setexamination ] = useState('');
    let [investigationso, setinvestigationso ] = useState('');

    const handleButtonClick = ({visit}: {visit: VisitsTable}) =>{
      setOpen(true);
      setpcom(visit.pcompl);
      sethpc(visit.hpc);
      setinvsf(visit.investigations_sofar);
      setprescription(visit.prescribed_med);
      setexamination(visit.examination);
      setinvestigationso(visit.investigations_ordered);
    };

    return(
      <div className="mt-1 overflow-x-auto min-w-full">
        <div className="mt-2 flow-root w-full">
        <div className="inline-block min-w-full align-middle ">
        
          <div className="rounded-lg bg-teal-400 p-2 md:pt-0 ">
          {patient1 && patient1.length > 0 ? (
            <React.Fragment>
            <div className="md:hidden">
              {patient1?.map((visit) => (
                <div
                  key={visit.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{formatDateToLocal(visit.date)}</p>
                      </div>
                    </div>
                    
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-sm text-gray-500">{visit.pcompl}</p>
                      <p className="text-sm font-medium">{visit.hpc}</p>
                      {/* <p className="text-sm text-gray-500">{visit.examination}</p>
                      <p className="text-sm text-gray-500">{visit.investigations_sofar}</p>
                      <p className="text-sm text-gray-500">{visit.prescribed_med}</p>
                      <p className="text-sm text-gray-500">{visit.prescription}</p>
                      <p className="text-sm text-gray-500">{visit.investigations_ordered}</p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm text-white font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6 max-w-xs">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    PC
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    HPC
                  </th>
                  {/* <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    Examination
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    Investigations Done
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    Treatment
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    Prescription
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium max-w-xs">
                    Investigations ordered
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white">
                {patient1?.map((visit) => (
                  <tr
                    key={visit.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-normal py-3 pl-6 pr-3 max-w-xs">
                      <div className="flex items-center gap-3">
                        <p>{formatDateToLocal(visit.date)}</p>
                      </div>
                    </td>
                    <td className="whitespace-normal py-3 pl-6 pr-3 max-w-xs">
                      <div className="flex items-center gap-3">
                        <p>{visit.pcompl}</p>
                      </div>
                    </td>
                    <td className="whitespace-normal px-3 py-3 max-w-xs">
                      {visit.hpc}
                    </td>
                    {/* <td className="whitespace-normal px-3 py-3 max-w-xs">
                      {(visit.examination)}
                    </td>
                    <td className="whitespace-normal px-3 py-3 max-w-xs">
                      {(visit.investigations_sofar)}
                    </td>
                    <td className="whitespace-normal px-3 py-3 max-w-xs">
                      {(visit.prescribed_med)}
                    </td>
                    <td className="whitespace-normal px-1 py-3 max-w-xs truncate">
                      {(visit.prescription)}
                    </td>
                    <td className="whitespace-normal px-3 py-3 max-w-xs">
                      {(visit.investigations_ordered)}
                    </td> */}
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        {/* <ViewVisit id={visit.id} /> */}
                         
                        <button className="rounded-md border p-2 hover:bg-gray-100" onClick={() => handleButtonClick({ visit })}>
                          <EyeIcon className="w-5" />
                        </button>
                        <DeleteVisit id={visit.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </React.Fragment>
          ) : (
            <div className="text-left pt-2 text-gray-800">
              No data available.
            </div>
            )}
            <div>
            <Transition.Root show={open} as={Fragment}>
             <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
               <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                                <FaceSmileIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                              </div>
                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                  Visit Details
                                </Dialog.Title>
                                <div className="mt-2">
                                  <p className="text-md text-gray-500 border-b">
                                    <span className="text-md text-green-500">Presenting Complain:</span> <span className="text-md text-gray-800">{pcom}</span>
                                  </p>
                                  <p className="text-md text-gray-500 border-b">
                                    <span className="text-md text-green-500">History of PC:</span> <span className="text-md text-gray-800">{hpc}</span>
                                  </p>
                                  <p className="text-md text-gray-500 border-b">
                                    <span className="text-md text-green-500">Examination:</span> <span className="text-md text-gray-800">{examination}</span>
                                  </p>
                                  <p className="text-md text-gray-500 border-b">
                                    <span className="text-md text-green-500">Investigation results:</span> <span className="text-md text-gray-800">{invsf}</span>
                                  </p>
                                  <p className="text-md text-gray-500 border-b">
                                    <span className="text-md text-green-500">Prescription:</span> <span className="text-md text-gray-800">{prescription}</span>
                                  </p>
                                  <p className="text-md text-gray-500 border-b">
                                    <span className="text-md text-green-500">Investigation ordered:</span> <span className="text-md text-gray-800">{investigationso}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
              </div>
          </div>
        </div>
      </div>
      </div>
    );
  }