import React, { useState, useEffect, useRef } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref: React.RefObject<HTMLDivElement | null>, closeFunction: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeFunction();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeFunction, ref]);
}

interface SelectOption {
  [key: string]: any
}

interface SelectFieldProps {
  disabled?: boolean
  selectOptions: SelectOption[] | string[]
  inputLabel?: string
  titleField?: string
  hasError?: boolean
  returnFieldValue: (value: SelectOption | string) => void
  inputPlaceholder?: string
  preSelectedIndex?: number
  preSelected?: SelectOption | string
  preSelectedLabel?: string
  requiredField?: boolean
  position?: string
}

const SelectField: React.FC<SelectFieldProps> = ({
  disabled,
  selectOptions,
  inputLabel,
  titleField = '',
  hasError,
  returnFieldValue,
  inputPlaceholder,
  preSelectedIndex,
  preSelected,
  preSelectedLabel,
  requiredField,
  position='top-[90px]'
}) => {
  const [activeValue, setActiveValue] = useState<string>('');
  const [visibleOptions, setVisibleOptions] = useState<SelectOption[] | string[]>(selectOptions);
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);

  useEffect(() => {
    const preSelect = () => {
      if(!preSelected || preSelected === undefined) {
        return
      }

      selectOptions?.forEach((option: SelectOption | string) => {
        if (preSelectedLabel && preSelectedLabel !== '' && typeof option === 'object' && option[preSelectedLabel] && option[preSelectedLabel] === preSelected) {
          setActiveValue(option[titleField])
        }

        if ((!preSelectedLabel || preSelectedLabel === '') && option === preSelected) {
          setActiveValue(typeof option === 'string' ? option : option[titleField])
        }
      })
    }
    preSelect()
  
  }, [preSelected, preSelectedLabel, selectOptions, titleField])


  const openOptions = () => {
    if(disabled) {return}
    setOptionsOpen(true)
  }

  const closeOptions = () => {
    setOptionsOpen(false)
  }

  const filterOptions = (term: string) => {
    const filtered = selectOptions.filter((option: SelectOption | string) => {
      if (titleField && titleField !== '' && typeof option === 'object') {
        return option[titleField].toLowerCase().includes(term.toLowerCase())
      } else {
        return typeof option === 'string' ? option.toLowerCase().includes(term.toLowerCase()) : Object.values(option).some(v => String(v).toLowerCase().includes(term.toLowerCase()))
      }
    })
    setActiveValue(term)
    setVisibleOptions(filtered as SelectOption[] | string[])
  }

  const changeActiveValue = (value: string, object: SelectOption | string) => {
    setActiveValue(value)
    returnFieldValue(object)
    closeOptions()
  }

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, closeOptions);

  return (
    <div ref={wrapperRef} className='relative w-full'>
      <div>
          {inputLabel && inputLabel !== '' && <label 
          className={`text-sm lg:text-md cursor-text block bg-transparent relative py-1 mb-1 transition duration-200  
          ${hasError ? 'text-red-600' : 'text-gray-500'}`}>
              {requiredField && requiredField === true && <span className='text-red-600'>*</span>} {inputLabel}
          </label>}
          
          {/* Text input */}
          <input 
              type="text" 
              className={`rounded py-3 px-3 block w-full focus:border-gray-800 focus:outline-none hover:border-gray-200 hover:bg-gray-50 border bg-gray-100  transition duration-200 focus:bg-white text-sm font-outfit placeholder:font-outfit  ${hasError ? 'border-red-600' : 'border-gray-100'}`}
              onClick={()=>{openOptions()}}  
              onFocus={()=>{openOptions()}}  
              placeholder={inputPlaceholder}
              readOnly
              onChange={(e)=>{}}
              value={activeValue} 
          />
      </div>
      {/* Options */}
      {optionsOpen &&
        <div className={`absolute shadow-lg border border-gray-200 rounded w-full left-0 py-1 bg-white overflow-y-scroll pt-1 z-50 ${position}`} 
        style={{
            maxHeight: '350px', 
            paddingBottom:'5px'
        }}>
            <div className='relative'>
                {visibleOptions.map((option: SelectOption | string, optionIndex: number) => (
                    <button key={optionIndex} 
                      className={
                        `relative w-full px-3 py-2 my-1 flex flex-row text-left items-center gap-x-3 text-sm transition duration-200 hover:bg-gray-100 text-gray-500}`
                      } 
                      onClick={()=>{
                        const displayValue = titleField !== '' && typeof option === 'object' ? option[titleField] : (typeof option === 'string' ? option : Object.values(option)[0])
                        changeActiveValue(String(displayValue), option)
                      }
                      }
                    >                               
                        {titleField !== '' && typeof option === 'object' ? option[titleField] : (typeof option === 'string' ? option : Object.values(option)[0])}
                    </button>
                ))}
            </div>
        </div>
      }
    </div>
  );
};

export default SelectField;
