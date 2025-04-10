export default function Button({
    className,
    variant = 'regular',
    disabled = false,
    children,
    ...props
}) {
    const baseClasses = `inline-flex items-center justify-center px-3 py-2 rounded-md font-semibold text-xs text-center text-white ${disabled && 'opacity-25'} tracking-widest transition ease-in-out duration-150`;
    
    const variantClasses = {
        regular: `bg-gray-600 ${!disabled && 'hover:bg-gray-700 active:bg-gray-900'}`,
        primary: `bg-blue-600 ${!disabled && 'hover:bg-blue-700 active:bg-blue-900'}`,
        success: `bg-green-600 ${!disabled && 'hover:bg-green-700 active:bg-green-900'}`,
        danger: `bg-red-600 ${!disabled && 'hover:bg-red-700 active:bg-red-900'}`,
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
