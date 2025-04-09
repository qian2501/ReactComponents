import { useEffect, useRef } from 'react';

export default function TextArea({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
}) {
    const textarea = useRef();

    useEffect(() => {
        if (isFocused) {
            textarea.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <textarea
                type={type}
                name={name}
                id={name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                ref={textarea}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
}
