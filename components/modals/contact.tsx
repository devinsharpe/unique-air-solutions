import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

import { ModalContext } from "../../providers/modalStatus";
import { UilTimes } from "@iconscout/react-unicons";

const ContactModal: React.FC<{ modalKey: string }> = ({ modalKey }) => {
  const modal = React.useContext(ModalContext);

  function closeModal() {
    modal.set(modalKey, false);
  }

  return (
    <Transition appear show={modal.status[modalKey]} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Curious about Something?
                </Dialog.Title>

                <form action="" className="mt-4 space-y-2">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded bg-slate-100 border-slate-200"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded bg-slate-100 border-slate-200"
                    placeholder="Email Address"
                  />
                  <textarea
                    name="contactMsg"
                    id="contact-msg"
                    className="w-full h-32 px-4 py-2 border rounded bg-slate-100 border-slate-200"
                    placeholder="Message..."
                  ></textarea>
                </form>

                <div className="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 space-x-2 text-sm font-medium border border-transparent rounded text-slate-900 bg-slate-100 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    <UilTimes />
                    <span>Close</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    <span>Schedule Visit</span>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ContactModal;
