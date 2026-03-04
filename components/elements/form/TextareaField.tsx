import React, { useState } from 'react'

interface TextareaFieldProps {
  inputLabel: string
  fieldId: string
  maxLength?: number
  requiredField?: boolean
  hasError?: boolean
  returnFieldValue: (value: string) => void
  preloadValue?: string
  disabled?: boolean
  inputPlaceholder?: string
}

const TextareaField: React.FC<TextareaFieldProps> = ({inputLabel, fieldId, maxLength, requiredField, hasError, returnFieldValue, preloadValue, disabled, inputPlaceholder}) => {

    const [ fieldValue, setFieldValue ] = useState<string>(preloadValue || '')

    const setValue = (value: string) => {
        setFieldValue(value)
        returnFieldValue(value)
    }

    return (
        <div>
            <label 
                className={`text-sm lg:text-md cursor-text z-10 relative py-1 transition mb-1 block duration-200  
                ${hasError ? 'text-red-600' : 'text-gray-500'}`}
            >
             {requiredField && requiredField === true && <span className='text-red-600'>*</span>}   {inputLabel}
            </label>
            <textarea 
                id={fieldId} 
                className={`rounded py-3 px-3 text-sm block w-full focus:border-gray-800 focus:outline-none hover:border-gray-200 hover:bg-gray-50 border bg-gray-100  transition duration-200 focus:bg-white font-outfit placeholder:font-outfit  ${hasError ? 'border-red-600' : 'border-gray-100'} min-h-30`}
                onChange={(e)=>{setValue(e.target.value)}}
                value={fieldValue}
                disabled={disabled}
                maxLength={maxLength}
                placeholder={inputPlaceholder}
                />
        </div>
    )
}

export default TextareaField
