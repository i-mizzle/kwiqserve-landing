import React, { useEffect, useState } from 'react'
import CloseIcon from '../icons/CloseIcon'

interface TextFieldTagCloudProps {
    inputLabel: string
    fieldId: string
    hasError?: boolean
    returnFieldValue: (tags: string[]) => void
    preloadValue?: string[]
    disabled?: boolean
    bgClass?: string
    autoFocus?: boolean
    maxLength?: number
    maxTags?: number
}

const TextFieldTagCloud: React.FC<TextFieldTagCloudProps> = ({
    inputLabel, 
    fieldId, 
    hasError, 
    returnFieldValue, 
    preloadValue, 
    disabled, 
    bgClass,
    autoFocus,
    maxLength,
    maxTags = 10
}) => {
    const [ isFocused, setIsFocused ] = useState<boolean>(false)
    const [ fieldValue, setFieldValue ] = useState<string>('')
    const [ tags, setTags ] = useState<string[]>(preloadValue ? preloadValue : [])

    const focusField = () => {
        setIsFocused(true)
        document.getElementById(fieldId)?.focus()
    }

    useEffect(() => {
        if (autoFocus && autoFocus === true) {
            focusField()
        }
    }, [autoFocus, fieldId])

    const setValue = (value: string) => {
        setFieldValue(value)
    }

    const addTag = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(tags.length === maxTags) {
            return
        }

        if(tags.filter((item) => {return item === fieldValue}).length > 0) {
            focusField()
            return
        }
        
        const tempTags = [...tags]
        tempTags.push(fieldValue)
        setTags(tempTags)

        returnFieldValue(tempTags)
        setFieldValue('')
        focusField()
    }

    const removeTag = (toDelete: string) => {
        const tempTags = [...tags]
        const removed = tempTags.filter((tag)=>{
            return tag !== toDelete
        }) 
        setTags(removed)
        returnFieldValue(removed)   
    }

    return (
        <div 
            className={`w-full cursor-text border rounded p-4 relative z-0 ${isFocused || fieldValue !== '' || tags.length > 0 ? 'border-black' : 'border-gray-400'} ${hasError && 'border-red-600'}`} 
            onClick={()=>{focusField()}} 
            onBlur={()=>{setIsFocused(false)}}
        >
            <label 
                className={`text-sm lg:text-md cursor-text z-10 absolute top-3 left-4 px-3 py-1 transition duration-200  
                ${isFocused || fieldValue !== '' || tags.length > 0 ? '-translate-y-8' : 'translate-y-0'}
                ${bgClass && bgClass !== '' ? bgClass : 'bg-white'}  
                ${hasError ? 'text-red-600' : 'text-gray-500'}`}
            >
                {inputLabel}
            </label>

            <div className='flex flex-wrap gap-3'>
                {tags.map((tag, tagIndex)=>(
                    <span key={tagIndex} className='flex items-center gap-x-2 px-3 py-1 h-6 bg-gray-100 text-sm text-black w-max font-thin'>
                        {tag}
                        <button className='' onClick={()=>{removeTag(tag)}}>
                            <CloseIcon className={`w-4`} />
                        </button>
                    </span>
                ))}
                <form onSubmit={(e)=>{addTag(e)}}>
                    <input 
                        id={fieldId} 
                        type="text" 
                        maxLength={maxLength}
                        className={`z-30 border-transparent bg-transparent outline-none min-w-12.5 w-inherit inline`} 
                        onChange={(e)=>{setValue(e.target.value)}}
                        value={fieldValue}
                        disabled={disabled}
                    />
                </form>
            </div>
        </div>
    )
}

export default TextFieldTagCloud
