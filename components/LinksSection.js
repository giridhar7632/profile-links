import React from 'react'
import { useFieldArray } from 'react-hook-form'
import Button from './common/Button'
import Input from './common/Input'
import FormSection from './FormSection'

const LinksSection = ({ register, control }) => {
  const { fields, append } = useFieldArray({ control, name: 'links' })
  return (
    <FormSection title={'Profile links'}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <div className="flex w-full flex-col items-center justify-center md:flex-row">
              <Input
                name="title"
                type="text"
                placeholder="display text"
                register={register(`links.${index}.title`)}
                divClass={'mr-1 w-[40%]'}
              />
              <Input
                name="link"
                type="link"
                placeholder="an important link to share"
                register={register(`links.${index}.link`)}
                divClass={'flex-1'}
              />
            </div>
          </li>
        ))}
      </ul>
      <Button
        variant={'text'}
        className="my-2 w-full"
        onClick={() => append({ title: '', link: '' })}
      >
        + Add link
      </Button>
    </FormSection>
  )
}

export default LinksSection
