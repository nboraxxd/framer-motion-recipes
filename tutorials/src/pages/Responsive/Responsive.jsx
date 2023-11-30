import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function Responsive() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="mt-8 flex justify-center px-10">
        <button
          className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:w-auto"
          onClick={() => setOpen(!open)}
        >
          Toggle
        </button>
      </div>

      <>
        {open && (
          <Dialog static className="relative z-10" open={open} onClose={setOpen}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Dialog.Panel
                  className="
                      relative overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl [--opacity-closed:0%] [--opacity-open:100%] max-sm:[--y-closed:16px] max-sm:[--y-open:0px]
                      sm:my-8 sm:w-full sm:max-w-lg
                      sm:p-6 sm:[--scale-closed:90%] sm:[--scale-open:100%]
                    "
                >
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Subscription confirmed
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat deserunt ea voluptate vel
                          aliquam! Quas, eum magnam nobis, necessitatibus quos natus labore quod.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Dismiss
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        )}
      </>
    </div>
  )
}
