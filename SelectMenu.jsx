import { useEffect, useRef } from 'react';

export default function SelectMenu({
    type = 'select',
    name,
    value,
    className = '',
    options,
    optionDisplay,
    isFocused,
    handleChange,
}) {
    const select = useRef();

    useEffect(() => {
        if (isFocused) {
            select.current.focus();
        }
    }, []);

    return (
        <select
            type={type}
            name={name}
            id={name}
            value={value}
            className={
                `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm text-gray-800 `
                + className
            }
            ref={select}
            onChange={(e) => handleChange(e)}
        >
            {options.map((one, index) => 
                <option key={index} value={one}>{optionDisplay[index]}</option>
            )}
        </select>
    )
}
