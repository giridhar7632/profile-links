import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from './common/Button'
import { Close, Pencil } from './common/icons'
import Input from './common/Input'

const LinkForm = ({
  title,
  defaultValues,
  children,
  onFormSubmit,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, setValue } = useForm()
  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  useEffect(() => {
    setValue('title', defaultValues?.title)
    setValue('link', defaultValues?.link)
  }, [defaultValues, setValue])

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      await onFormSubmit(data)
      setIsOpen(false)
      reset()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  })

  return (
    <>
      <Button onClick={handleOpen} variant="text" {...props}>
        {children}
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-100 fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-y-auto rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="mb-5 flex items-center justify-between text-lg font-semibold leading-6 text-gray-800"
                  >
                    <h3>{title}</h3>
                    <Close
                      width={24}
                      height={24}
                      onClick={handleClose}
                      className={'cursor-pointer'}
                    />
                  </Dialog.Title>
                  <form className="mb-4 flex w-full flex-col items-center justify-center">
                    <Input
                      name="title"
                      type="text"
                      placeholder="display text"
                      register={register(`title`)}
                      divClass={'w-full'}
                    />
                    <Input
                      name="link"
                      type="link"
                      placeholder="an important link to share"
                      register={register(`link`)}
                      divClass={'w-full'}
                    />
                  </form>
                  <Button
                    onClick={onSubmit}
                    loading={loading}
                    loadingText={'Saving...'}
                  >
                    Save
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default LinkForm
