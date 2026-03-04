import React, { useState, useEffect, useRef } from 'react'
import PlusIcon from '../icons/PlusIcon';
import InlinePreloader from '../InlinePreloader';
import CheckIcon from '../icons/CheckIcon';
import { useOutsideAlerter } from './SelectField';

interface ConditionalItemStyling {
  itemIdentifier: string
  action: (option: any) => Promise<void>
  conditionTriggerKey: string
  classes?: string
  buttonClasses?: string
  buttonLabel?: string
  itemProcessed?: string
  actionProcessed?: boolean
  includeButton?: boolean
}

interface AutocompleteSelectProps {
    selectOptions: any[]
    inputLabel: string
    inputPlaceholder?: string
    displayImage?: boolean
    imageField?: string
    bgImage?: boolean
    titleField: string
    preSelected?: any
    preSelectedLabel?: string
    hasError?: boolean
    returnFieldValue: (value: any) => void
    includeButton?: boolean
    buttonLabel?: string
    buttonAction?: () => void
    disabled?: boolean
    requiredField?: boolean
    conditionalItemStyling?: ConditionalItemStyling
    position?: string
}

const AutocompleteSelect: React.FC<AutocompleteSelectProps> = ({
    selectOptions, 
    inputLabel, 
    inputPlaceholder,
    displayImage, 
    imageField, 
    bgImage,
    titleField, 
    preSelected, 
    preSelectedLabel,
    hasError, 
    returnFieldValue,
    includeButton,
    buttonLabel,
    buttonAction,
    disabled,
    requiredField,
    conditionalItemStyling,
    position='top-[90px]'
}) => {
    const [activeValue, setActiveValue] = useState<string>('')
    const [visibleOptions, setVisibleOptions] = useState<any[]>(selectOptions)
    const [optionsOpen, setOptionsOpen] = useState<boolean>(false)
    const [conditionalItemProcessing, setConditionalItemProcessing] = useState<string>('');

    useEffect(() => {
        const preSelect = () => {
            if(!preSelected || preSelected === undefined) {
                return
            }
    
            selectOptions?.forEach((option) => {
                if (preSelectedLabel && preSelectedLabel !== '' && option[preSelectedLabel] && option[preSelectedLabel] === preSelected) {
                    setActiveValue(option[titleField])
                }

                if ((!preSelectedLabel || preSelectedLabel === '') && option === preSelected) {
                    setActiveValue(option)
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
        const filtered = selectOptions.filter((option)=> {
            if (titleField && titleField !== '') {
                return option[titleField].toLowerCase().includes(term.toLowerCase())
            } else {
                return option.toLowerCase().includes(term.toLowerCase())
            }
        })
        setActiveValue(term)
        setVisibleOptions(filtered)
    }

    const changeActiveValue = (value: string, object: any) => {
        setActiveValue(value)
        returnFieldValue(object)
        closeOptions()
    }

    const fireConditionalAction = async (option: any) => {
        setConditionalItemProcessing(option[conditionalItemStyling!.itemIdentifier])

        await conditionalItemStyling?.action(option)
        setTimeout(() => {
            setConditionalItemProcessing('')        
        }, 3000);
    }

    const wrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
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
                    readOnly={disabled}
                    onChange={(e)=>{filterOptions(e.target.value)}}
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
                        {visibleOptions.map((option, optionIndex) => (
                            <button key={optionIndex} 
                                className={
                                    `relative w-full px-3 py-2 my-1 flex flex-row text-left items-center gap-x-3 text-sm transition duration-200 hover:bg-gray-100 
                                    ${conditionalItemStyling && option[conditionalItemStyling.conditionTriggerKey] == true 
                                        ? conditionalItemStyling.classes 
                                        : 'text-gray-500'}`
                                } 
                                
                                onClick={()=>{
                                    if(conditionalItemStyling && option[conditionalItemStyling.conditionTriggerKey] === true) {
                                        fireConditionalAction(option)
                                    } else {
                                        changeActiveValue(titleField !== '' ? option[titleField] : option, option)}
                                    }
                                }
                            >
                                {displayImage && !bgImage &&
                                    <img alt="" src={option[imageField || '']} className='w-7.5' />
                                }

                                {displayImage && bgImage &&
                                    <div className='w-8.75 h-8.75 rounded-full' style={{
                                        backgroundImage: `url(${ option[imageField || '']})`, backgroundSize: 'cover', backgroundPosition: 'center'
                                    }} />
                                }

                                {conditionalItemStyling && option[conditionalItemStyling.conditionTriggerKey]}

                                
                                {titleField !== '' ? option[titleField] : option}
                                
                                {conditionalItemStyling && option[conditionalItemStyling.conditionTriggerKey] === true && !conditionalItemStyling.actionProcessed && conditionalItemStyling.includeButton &&
                                    <>
                                        {conditionalItemProcessing === option[conditionalItemStyling.itemIdentifier] ?
                                            <span className='absolute right-12 w-5'>
                                                <InlinePreloader />
                                            </span>
                                            :
                                            <span className={`${conditionalItemStyling.buttonClasses}`}>
                                                {conditionalItemStyling.itemProcessed === option[conditionalItemStyling.itemIdentifier] ?
                                                    <CheckIcon className={`w-4 h-4 text-green-500`} />
                                                    :
                                                    conditionalItemStyling.buttonLabel
                                                }
                                            </span>
                                        }
                                    </>
                                }
                            </button>
                        ))}
                        {/* Footer Button */}
                        {includeButton && includeButton === true &&
                            <button className='absolute -bottom-13.75 left-[10%] right-auto w-[80%] px-3 py-4 text-center text-sm bg-black font-tomato transition duration-200 hover:bg-gray-800 text-white flex items-center justify-center gap-x-1' onClick={()=>{buttonAction?.()}}>
                                <PlusIcon className={`w-4 h-4`}/>
                                {buttonLabel}
                            </button>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default AutocompleteSelect
