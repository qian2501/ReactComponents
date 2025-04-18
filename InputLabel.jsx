export default function InputLabel({ forInput, value, className = '', children }) {
    return (
        <label htmlFor={forInput} className={`block font-medium text-sm ` + className}>
            {value ? value : children}
        </label>
    );
}
